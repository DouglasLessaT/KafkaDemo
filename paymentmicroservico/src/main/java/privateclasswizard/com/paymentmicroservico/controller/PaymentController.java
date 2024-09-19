package privateclasswizard.com.paymentmicroservico.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import privateclasswizard.com.paymentmicroservico.model.Payment;
import privateclasswizard.com.paymentmicroservico.service.PaymentService;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pagar")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Injeta o WebClient
    @Autowired
    private WebClient.Builder webClientBuilder;

    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        Payment payment = new Payment();
        payment.setOrderId(paymentRequest.getOrderId());
        payment.setAmount(paymentRequest.getAmount());
        paymentService.savePayment(payment);


        String response = webClientBuilder.build()
            .post()
            .uri("http://localhost:8081/notificar") // URL do Microserviço 2
            .bodyValue(paymentRequest)
            .retrieve()
            .bodyToMono(String.class)
            .block();

        return ResponseEntity.ok("Pagamento processado e notificado: " + response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Payment>> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }
}
