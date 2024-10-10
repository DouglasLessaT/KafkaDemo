import { Kafka, logLevel } from 'kafkajs';

export class KafkaPublisher {
    private kafkaBroker: string;
    private newKafkaTopic: string;

    constructor() {
        this.kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
        this.newKafkaTopic = process.env.NEW_KAFKA_TOPIC || 'notification';
    }

    public async sendMessage(message: any) {
        const kafka = new Kafka({
            clientId: 'kafka-producer',
            brokers: [this.kafkaBroker],
            logLevel: logLevel.INFO,
        });

        const producer = kafka.producer();

        await producer.connect();
        console.log(`Conectado ao Kafka, broker: ${this.kafkaBroker}`);

        try {
            await producer.send({
                topic: this.newKafkaTopic,
                messages: [{ value: JSON.stringify(message) }],
            });
            console.log(`Mensagem enviada para o tópico "${this.newKafkaTopic}":`, message);
        } catch (error) {
            console.error('Erro ao enviar a mensagem', error);
        } finally {
            await producer.disconnect();
        }
    }
}

// Exemplo de uso:
const exampleMessage = {
    orderId: '12345',
    descricao: 'Exemplo de pagamento',
    amount: 100.5,
};

const publisher = new KafkaPublisher();
publisher.sendMessage(exampleMessage);
