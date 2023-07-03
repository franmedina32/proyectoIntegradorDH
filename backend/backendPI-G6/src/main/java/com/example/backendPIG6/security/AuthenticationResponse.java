package com.example.backendPIG6.security;

import com.example.backendPIG6.domain.Rol;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationResponse {
    private String token;

}
