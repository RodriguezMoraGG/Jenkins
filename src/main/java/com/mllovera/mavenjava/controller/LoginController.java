/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mllovera.mavenjava.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Maximino Llovera
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap model, HttpServletRequest request) {
        return "login";
    }

    @RequestMapping(value = {"/forgotPassword"}, method = RequestMethod.GET)
    public String forgotPassword(ModelMap model, HttpServletRequest request) {
        return "login";
    }

}
