package com.zydrunas.imageAnalyzer.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class ValidatedImageResponse {
    private boolean approved;
    private String category;
}
