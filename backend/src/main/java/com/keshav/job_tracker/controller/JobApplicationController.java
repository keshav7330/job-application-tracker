package com.keshav.job_tracker.controller;

import com.keshav.job_tracker.model.JobApplication;
import com.keshav.job_tracker.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationRepository repo;

    @GetMapping
    public List<JobApplication> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public JobApplication create(@RequestBody JobApplication app) {
        return repo.save(app);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}