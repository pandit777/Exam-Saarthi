from django.core.management.base import BaseCommand
from accounts.models import IGUMcomPaper

class Command(BaseCommand):
    help = 'Import IGU M.Com papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            {'paper_id': '12348', 'paper_name': 'Management Concept & Organization Behavior', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1EKUHXZDmSvP8o7m8VbXSU0W6o6OGbCR-/view'},
        ]

        for paper in papers_data:
            IGUMcomPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'M.Com',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all M.Com papers!'))