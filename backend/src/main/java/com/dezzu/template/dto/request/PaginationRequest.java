package com.dezuani.template.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PaginationRequest {

    private Integer size = 10;
    private Integer page = 0;
    private String sortField;
    private Integer sortOrder;
    private String query;

}
