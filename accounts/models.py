from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    university = models.CharField(max_length=200)
    course = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.email}"

class IGUPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
        ('7th', '7th Semester'),
        ('8th', '8th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="B.Tech")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUMtechPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="M.Tech")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUBcaPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="BCA")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUBbaPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="BBA")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUBscPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="BSc")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUMscPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="MSc")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUBaPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="BA")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUMaPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="MA")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUBcomPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
        ('5th', '5th Semester'),
        ('6th', '6th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="B.Com")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"

class IGUMcomPaper(models.Model):
    SEMESTER_CHOICES = [
        ('1st', '1st Semester'),
        ('2nd', '2nd Semester'),
        ('3rd', '3rd Semester'),
        ('4th', '4th Semester'),
    ]

    paper_id = models.CharField(max_length=50, verbose_name="Paper ID")
    paper_name = models.CharField(max_length=200, verbose_name="Paper Name")
    course = models.CharField(max_length=100, default="M.Com")
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    year = models.CharField(max_length=10)
    pdf_link = models.URLField(verbose_name="PDF Link / Drive Link")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.paper_id} - {self.paper_name} ({self.semester} Sem, {self.year})"