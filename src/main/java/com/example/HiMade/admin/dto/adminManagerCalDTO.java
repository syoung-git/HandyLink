package com.example.HiMade.admin.dto;

import lombok.*;
import org.aspectj.weaver.ast.Test;
import org.w3c.dom.Text;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class adminManagerCalDTO {
  private LocalDate reservationSlotDate;
  private String reservationStatus;
  private int count;

  private int reservationNo;
  private LocalTime reservationTime;
  private LocalDateTime regTime	;
  private String customerRequest;
  private int reservationPrice;
  private String storeId;
  private String userId;
  private String serviceName;

  private String paymentStatus;
}
