package com.diary.backend.repository;

import com.diary.backend.model.DiaryEntry;
import com.diary.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {
    
    @Query("SELECT e FROM DiaryEntry e WHERE e.user = :user " +
           "AND (:startDate IS NULL OR e.entryDate >= :startDate) " +
           "AND (:endDate IS NULL OR e.entryDate <= :endDate) " +
           "AND (:q IS NULL OR :q = '' OR LOWER(e.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(e.content) LIKE LOWER(CONCAT('%', :q, '%')))")
    Page<DiaryEntry> searchEntries(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("q") String q,
            Pageable pageable
    );
}
