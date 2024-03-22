package com.zydrunas.imageAnalyzer.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CategoriesDto {
    private Long id;
    private String name;
    private Boolean prohibited;
}
