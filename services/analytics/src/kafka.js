const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: "analytics-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
})

const consumer = kafka.consumer({ groupId: "analytics-group" })

const connectConsumer = async (onMessage) => {
  await consumer.connect()
  await consumer.subscribe({ topic: "url.clicked", fromBeginning: false })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString())
      await onMessage(data)
    },
  })

  console.log("Kafka consumer connected and listening")
}

module.exports = { connectConsumer }