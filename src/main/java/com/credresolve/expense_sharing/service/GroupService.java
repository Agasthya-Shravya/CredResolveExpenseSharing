package com.credresolve.expense_sharing.service;

import com.credresolve.expense_sharing.model.Group;
import com.credresolve.expense_sharing.model.User;
import com.credresolve.expense_sharing.repository.GroupRepository;
import com.credresolve.expense_sharing.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    public Group createGroup(String groupName, Set<Long> userIds) {
        Group group = new Group(groupName);

        Set<User> users = new HashSet<>(userRepository.findAllById(userIds));
        group.setUsers(users);

        return groupRepository.save(group);
    }
}
