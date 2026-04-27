package com.keshav.job_tracker.repository;

import com.keshav.job_tracker.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
}