package com.soen390.team11.controller;

import com.soen390.team11.service.PartService;
import com.soen390.team11.service.PartInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory/parts")
public class PartInventoryController {

    @Autowired
    PartInventoryService partInventoryService;

    @Autowired
    PartService partService;

    @GetMapping("/{partId}/materials")
    public ResponseEntity<?> retrivePartMaterials(@PathVariable Long partId){
        return ResponseEntity.ok((partInventoryService.getPartMaterials(partId)));
    }
}