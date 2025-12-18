package com.credresolve.expense_sharing.controller;

import com.credresolve.expense_sharing.model.Group;
import com.credresolve.expense_sharing.service.GroupService;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public Group createGroup(@RequestParam String name,
                             @RequestParam Set<Long> userIds) {
        return groupService.createGroup(name, userIds);
    }
}
