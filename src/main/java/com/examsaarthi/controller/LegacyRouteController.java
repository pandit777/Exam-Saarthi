package com.examsaarthi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LegacyRouteController {

    @GetMapping({
            "/index.html", "/Universities.html", "/about.html", "/Contact.html", "/igu.html",
            "/igu-ba.html", "/igu-bba.html", "/igu-bca.html", "/igu-bcom.html", "/igu-bsc.html",
            "/igu-btech.html", "/igu-ma.html", "/igu-mcom.html", "/igu-msc.html", "/igu-mtech.html"
    })
    public String redirectLegacyRoutes() {
        return "redirect:/";
    }
}
