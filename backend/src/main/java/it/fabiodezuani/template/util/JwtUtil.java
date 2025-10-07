package it.fabiodezuani.template.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
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

    // --- Estrazione Claims ---
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
        Key key = getSigningKey(isRefresh);
        return Jwts.parser()
                .setSigningKey(key)
                .build().parseSignedClaims(token).getPayload();
    }

    private Key getSigningKey(boolean isRefresh) {
        String secret = isRefresh ? refreshSecret : accessSecret;
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    private Boolean isTokenExpired(String token, boolean isRefresh) {
        return extractExpiration(token, isRefresh).before(new Date());
    }

    // --- Generazione Token ---
    public String generateAccessToken(String username, Map<String, Object> claims) {
        return createAccessToken(claims, username);
    }

    private String createAccessToken(Map<String, Object> claims, String subject) {
        Key key = getSigningKey(false);
        return Jwts.builder().claims(claims).subject(subject).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * accessDuration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String subject) {
        Key key = getSigningKey(true);
        return Jwts.builder().subject(subject).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * refreshDuration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // --- Validazione ---
    public Boolean validateToken(String token, UserDetails userDetails, boolean isRefresh) {
        final String username = extractUsername(token, isRefresh);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, isRefresh));
    }
}