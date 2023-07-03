package com.example.backendPIG6.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthUsuarioDTO {
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Email
    private String password;
}
