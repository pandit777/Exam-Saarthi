from django.contrib import admin
from .models import Contact, IGUPaper, IGUMtechPaper, IGUBcaPaper, IGUBbaPaper, IGUBscPaper, IGUMscPaper, IGUBaPaper, IGUMaPaper, IGUBcomPaper, IGUMcomPaper

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'university', 'course', 'message', 'created_at')
    list_filter = ('university', 'created_at')
    search_fields = ('name', 'email', 'university', 'message')
    list_per_page = 25
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'university', 'course')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Timestamp', {
            'fields': ('created_at',)
        }),
    )
    readonly_fields = ('created_at',)

@admin.register(IGUPaper)
class IGUPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUMtechPaper)
class IGUMtechPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUBcaPaper)
class IGUBcaPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUBbaPaper)
class IGUBbaPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUBscPaper)
class IGUBscPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUMscPaper)
class IGUMscPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUBaPaper)
class IGUBaPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUMaPaper)
class IGUMaPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUBcomPaper)
class IGUBcomPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(IGUMcomPaper)
class IGUMcomPaperAdmin(admin.ModelAdmin):
    list_display = ('paper_id', 'paper_name', 'semester', 'year', 'pdf_link', 'created_at')
    list_filter = ('semester', 'year')
    search_fields = ('paper_id', 'paper_name', 'course')
    list_per_page = 25
    
    fieldsets = (
        ('Paper Details', {
            'fields': ('paper_id', 'paper_name', 'course', 'semester', 'year')
        }),
        ('PDF Link', {
            'fields': ('pdf_link',)
        }),
        ('Timestamp', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')