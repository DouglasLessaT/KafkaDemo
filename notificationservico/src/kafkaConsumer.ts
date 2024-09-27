import { Kafka, Consumer } from "kafkajs";

export class KafkaConsumer {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(broker: string, groupId: string) {
    this.kafka = new Kafka({
      clientId: "notification-microservice",
      brokers: [broker],
    });

    this.consumer = this.kafka.consumer({ groupId });
  }

  public async  connect(topic: string) {
   await this.consumer.connect();
   console.log('Conectando ao Kafka');

   await this.consumer.subscribe({topic, fromBeginning:true})

   await this.consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
     const paymentData = message.value?.toString();
     console.log(`Mensagem recebida do tópico ${topic}: ${paymentData}`);
    }
   })

  }

}
