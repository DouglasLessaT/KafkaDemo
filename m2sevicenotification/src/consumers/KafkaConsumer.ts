import { Kafka, Consumer } from "kafkajs";
import axios from "axios";
import { KafkaPublisher } from "./KafkaPubliser"; 

export class KafkaConsumer {
  private kafka: Kafka;
  private consumer: Consumer;
  private kafkaPublisher: KafkaPublisher;

  constructor(broker: string, groupId: string) {
    this.kafka = new Kafka({
      clientId: "notification-microservice",
      brokers: [broker],
    });

    this.consumer = this.kafka.consumer({ groupId });
    this.kafkaPublisher = new KafkaPublisher(); 
  }

  public async connect(topic: string) {
    await this.consumer.connect();
    console.log('Conectando ao Kafka');

    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentData = message.value?.toString();
        console.log(`Mensagem recebida do tópico ${topic}: ${paymentData}`);

        try {
          const paymentObject = JSON.parse(paymentData!);
          console.log('Dados do pagamento:', paymentObject);

  
          await this.kafkaPublisher.sendMessage(paymentObject);
          console.log(`Mensagem publicada no novo tópico: ${JSON.stringify(paymentObject)}`);

        } catch (error) {
          console.error('Erro ao analisar a mensagem JSON:', error);
        }
      }
    });
  }
}
