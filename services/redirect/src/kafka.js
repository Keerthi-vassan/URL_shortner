const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: "redirect-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
})

const producer = kafka.producer()

const connectProducer = async () => {
  await producer.connect()
  console.log("Kafka producer connected")
}

const publishClickEvent = async (shortCode, originalUrl) => {
  await producer.send({
    topic: "url.clicked",
    messages: [
      {
        value: JSON.stringify({ shortCode, originalUrl, timestamp: new Date().toISOString() }),
      },
    ],
  })
}

module.exports = { connectProducer, publishClickEvent }