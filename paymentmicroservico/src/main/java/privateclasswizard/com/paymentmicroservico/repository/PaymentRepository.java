package privateclasswizard.com.paymentmicroservico.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import privateclasswizard.com.paymentmicroservico.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}