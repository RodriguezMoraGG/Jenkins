/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mllovera.mavenjava.controller;

import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Maximino Llovera
 */
@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping(method = RequestMethod.GET)
    public String index(ModelMap model, HttpServletRequest request) {
        return welcome(model, request);
    }

    @RequestMapping(value = {"/index", "/welcome"}, method = RequestMethod.GET)
    public String welcome(ModelMap model, HttpServletRequest request) {
        return "index";
    }

    @RequestMapping(value = "/printSection", method = RequestMethod.GET)
    public String printSection(ModelMap model) {
        return "printSection";
    }

    @RequestMapping(value = "/catalog", method = RequestMethod.GET)
    public String catalogs(ModelMap model, HttpServletRequest request) {
        return "catalogs";
    }

    @RequestMapping(value = {"/catalog/list"}, method = RequestMethod.GET)
    public @ResponseBody
    List<Object> list() {
        return new LinkedList<>();
    }

    @RequestMapping(value = {"user/viewProfile"}, method = RequestMethod.GET)
    public String viewProfile(ModelMap model, HttpServletRequest request) {
        //model.put("catalogs", );
        return "user";
    }

    @RequestMapping(value = {"user/getEmployee/{idEmployee}"}, method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getEmployee(@PathVariable("idEmployee") Long idEmployee) {
        return new ResponseEntity(new Object(), HttpStatus.OK);
    }
}
