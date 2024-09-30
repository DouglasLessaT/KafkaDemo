package privateclasswizard.m1sevicepayament.model;

import org.springframework.stereotype.Component;
import lombok.Data;


@Data
@Component
public class Payment {

    private String orderId;
    private String descricao;
    private double amount;

}