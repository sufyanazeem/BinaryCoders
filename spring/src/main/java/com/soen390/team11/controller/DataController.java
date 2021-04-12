package com.soen390.team11.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soen390.team11.dto.CustomerPurchaseDto;
import com.soen390.team11.service.DataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/data")
public class DataController {
    ObjectMapper objectMapper = new ObjectMapper();
    DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/income")
    public ResponseEntity<?> getIncomeReport(){
        return new ResponseEntity<>(dataService.getIncomeReport(), HttpStatus.OK);

    }
    @GetMapping("/expense")
    public ResponseEntity<?> getExpenseReport(){
        return new ResponseEntity<>(dataService.getExpenseReport(), HttpStatus.OK);

    }
    @GetMapping("/topProduct")
    public ResponseEntity<?> getTopProduct(){
        return new ResponseEntity<>(dataService.getTopProduct(), HttpStatus.OK);

    }
    @GetMapping("/summary")
    public ResponseEntity<?> getSummary(){
        return new ResponseEntity<>(dataService.getSummary(), HttpStatus.OK);

    }


}
