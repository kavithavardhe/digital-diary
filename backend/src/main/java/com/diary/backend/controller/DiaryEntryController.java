package com.diary.backend.controller;

import com.diary.backend.model.DiaryEntry;
import com.diary.backend.model.User;
import com.diary.backend.repository.DiaryEntryRepository;
import com.diary.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/entries")
public class DiaryEntryController {

    @Autowired
    private DiaryEntryRepository diaryEntryRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<Page<DiaryEntry>> getAllEntries(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int limit) {
        User user = getAuthenticatedUser();
        Pageable pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "entryDate", "id"));
        Page<DiaryEntry> entries = diaryEntryRepository.searchEntries(user, startDate, endDate, q, pageable);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiaryEntry> getEntryById(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        DiaryEntry entry = diaryEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(entry);
    }

    @PostMapping
    public ResponseEntity<DiaryEntry> createEntry(@Valid @RequestBody DiaryEntry entry) {
        User user = getAuthenticatedUser();
        entry.setUser(user);
        DiaryEntry savedEntry = diaryEntryRepository.save(entry);
        return ResponseEntity.ok(savedEntry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiaryEntry> updateEntry(@PathVariable Long id, @Valid @RequestBody DiaryEntry entryDetails) {
        User user = getAuthenticatedUser();
        DiaryEntry entry = diaryEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        entry.setTitle(entryDetails.getTitle());
        entry.setContent(entryDetails.getContent());
        entry.setEntryDate(entryDetails.getEntryDate());

        DiaryEntry updatedEntry = diaryEntryRepository.save(entry);
        return ResponseEntity.ok(updatedEntry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEntry(@PathVariable Long id) {
        User user = getAuthenticatedUser();
        DiaryEntry entry = diaryEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        if (!entry.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        diaryEntryRepository.delete(entry);
        return ResponseEntity.ok().build();
    }
}
