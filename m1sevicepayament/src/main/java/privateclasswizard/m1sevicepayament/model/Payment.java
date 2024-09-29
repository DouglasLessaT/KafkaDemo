package privateclasswizard.m1sevicepayament.model;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class Payment {

    private Long id; // usar um gerador de numero
    private String orderId;
    private double amount;
}