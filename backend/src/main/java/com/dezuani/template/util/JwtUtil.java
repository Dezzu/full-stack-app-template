package com.dezuani.template.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Value("${jwt.access.secret}")
    private String accessSecret;

    @Value("${jwt.access.duration}")
    private long accessDuration;

    @Value("${jwt.refresh.secret}")
    private String refreshSecret;

    @Value("${jwt.refresh.duration}")
    private long refreshDuration;

    public String extractUsername(String token, boolean isRefresh) {
        return extractClaim(token, Claims::getSubject, isRefresh);
    }

    public Date extractExpiration(String token, boolean isRefresh) {
        return extractClaim(token, Claims::getExpiration, isRefresh);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver, boolean isRefresh) {
        final Claims claims = extractAllClaims(token, isRefresh);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token, boolean isRefresh) {
        String key = isRefresh ? refreshSecret : accessSecret;
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token, boolean isRefresh) {
        return extractExpiration(token, isRefresh).before(new Date());
    }

    public String generateAccessToken(String username, Map<String, Object> claims) {
        return createAccessToken(claims, username);
    }

    private String createAccessToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * accessDuration))
                .signWith(SignatureAlgorithm.HS256, accessSecret).compact();
    }
    
    public String createRefreshToken(String subject) {
        return Jwts.builder().setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * refreshDuration))
                .signWith(SignatureAlgorithm.HS256, refreshSecret).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails, boolean isRefresh) {
        final String username = extractUsername(token, isRefresh);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, isRefresh));
    }
}