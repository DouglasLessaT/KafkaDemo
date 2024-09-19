package privateclasswizard.com.paymentmicroservico.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import privateclasswizard.com.paymentmicroservico.model.Payment;
import privateclasswizard.com.paymentmicroservico.repository.PaymentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Salva um pagamento no banco de dados
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Retorna todos os pagamentos
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Retorna um pagamento por ID
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
}
