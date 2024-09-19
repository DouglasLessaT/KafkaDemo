package privateclasswizard.com.paymentmicroservico.controller;

import lombok.Data;

@Data
public class PaymentRequest {
    private String orderId;
    private double amount;
}
