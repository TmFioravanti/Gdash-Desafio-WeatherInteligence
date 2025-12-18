import os
import time
import json
import requests
import pika
from datetime import datetime, timezone

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
QUEUE_NAME = os.getenv("RABBITMQ_QUEUE", "weather_queue")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
CITY = os.getenv("CITY", "Rio de Janeiro")

def get_weather():
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": CITY, "appid": OPENWEATHER_API_KEY, "units": "metric", "lang": "pt_br"}
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "city": CITY,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "condition": data["weather"][0]["description"],
    }

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True)

    while True:
        weather = get_weather()
        body = json.dumps(weather)
        channel.basic_publish(
            exchange="",
            routing_key=QUEUE_NAME,
            body=body,
            properties=pika.BasicProperties(delivery_mode=2),
        )
        print("[Python] Enviado:", body)
        time.sleep(300)  # em dev você pode baixar para 30

if __name__ == "__main__":
    main()
