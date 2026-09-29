package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	City        string  `json:"city"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	WindSpeed   float64 `json:"wind_speed"`
	Condition   string  `json:"condition"`
}

func main() {
	rabbitURL := os.Getenv("RABBITMQ_URL")
	queueName := os.Getenv("RABBITMQ_QUEUE")
	apiBase := os.Getenv("API_BASE_URL")
	apiURL := apiBase + "/weather/logs"

	conn, err := amqp.Dial(rabbitURL)
	if err != nil {
		log.Fatal("Erro ao conectar no RabbitMQ:", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatal("Erro ao abrir canal:", err)
	}
	defer ch.Close()

	msgs, err := ch.Consume(
		queueName,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatal("Erro ao consumir fila:", err)
	}

	log.Println("[Go] Worker iniciado. Aguardando mensagens...")
	for msg := range msgs {
		log.Println("[Go] Mensagem recebida:", string(msg.Body))

		var payload WeatherMessage
		if err := json.Unmarshal(msg.Body, &payload); err != nil {
			log.Println("Erro ao parsear JSON:", err)
			msg.Nack(false, false)
			continue
		}

		body, _ := json.Marshal(map[string]interface{}{
			"timestamp":   payload.Timestamp,
			"city":        payload.City,
			"temperature": payload.Temperature,
			"humidity":    payload.Humidity,
			"windSpeed":   payload.WindSpeed,
			"condition":   payload.Condition,
		})

		resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(body))
		if err != nil {
			log.Println("Erro ao enviar para API:", err)
			msg.Nack(false, true)
			continue
		}
		if resp.StatusCode >= 300 {
			log.Println("API retornou erro:", resp.StatusCode)
			msg.Nack(false, true)
			continue
		}

		msg.Ack(false)
		log.Println("[Go] Registro enviado com sucesso para API.")
	}
}
