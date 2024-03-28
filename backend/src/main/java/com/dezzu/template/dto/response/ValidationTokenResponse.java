package com.dezzu.template.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ValidationTokenResponse {
    private boolean valid;
    private String username;
    private Long userId;
}
