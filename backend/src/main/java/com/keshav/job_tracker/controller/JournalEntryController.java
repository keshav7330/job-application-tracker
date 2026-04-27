package com.keshav.job_tracker.controller;

import com.keshav.job_tracker.model.JournalEntry;
import com.keshav.job_tracker.repository.JournalEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journal")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JournalEntryController {

    private final JournalEntryRepository repo;

    @GetMapping
    public List<JournalEntry> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public JournalEntry create(@RequestBody JournalEntry entry) {
        return repo.save(entry);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}