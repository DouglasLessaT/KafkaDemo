import { KafkaConsumer } from './kafkaConsumer';

const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
const kafkaTopic = process.env.KAFKA_TOPIC || 'payments';
const consumerGroupId = process.env.CONSUMER_GROUP_ID || 'notification_group';

const consumer = new KafkaConsumer(kafkaBroker, consumerGroupId);

async function start() {
    try {
        await consumer.connect(kafkaTopic);
        console.log(`Consumidor do tópico "${kafkaTopic}" inicializado.`);
    } catch (error) {
        console.error('Erro ao inicializar o consumidor Kafka', error);
    }
}

start();
