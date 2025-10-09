package it.fabiodezuani.recipes.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "step_images")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class StepImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_step", nullable = false)
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Step step;

    @Column(name = "\"order\"")
    private Integer order;

    @Column
    private Boolean cover;
}
