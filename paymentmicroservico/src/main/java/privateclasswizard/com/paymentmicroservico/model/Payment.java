package privateclasswizard.com.paymentmicroservico.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Payment {

    private Long id;
    private String orderId;
    private double amount;
}