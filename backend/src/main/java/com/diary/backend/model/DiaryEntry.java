package com.diary.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "diary_entries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must be at most 200 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Content is required")
    @Size(max = 50000, message = "Content must be at most 50000 characters")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @NotNull(message = "Entry date is required")
    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
