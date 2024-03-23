package com.zydrunas.imageAnalyzer.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Label {
    private String name;
    private double score;
}
