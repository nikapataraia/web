package com.lostpet.services.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response{
    protected LocalDateTime timestamp;
    protected int statuscode;
    protected HttpStatus status;
    protected String reason;
    protected String message;
    protected String devmessage;
    protected Map<?,?> data;
}
