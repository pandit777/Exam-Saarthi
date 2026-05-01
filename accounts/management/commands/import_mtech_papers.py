from django.core.management.base import BaseCommand
from accounts.models import IGUMtechPaper

class Command(BaseCommand):
    help = 'Import IGU M.Tech papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '12587', 'paper_name': 'Advanced Operating System', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1zyr7OV1oYCApGtTAPPmYtInL2odh2lXG/view'},
            {'paper_id': '12507', 'paper_name': 'Satellite and Space Communication', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1NqPiE4xpZLfQdS2OltO16V0Eq9c1lcJQ/view'},
            {'paper_id': '12589', 'paper_name': 'Data Warehouse and Mining', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1IBSpDBsrfFP0MjFqVwMDZjuj1oICgaSv/view'},
            
            # 2nd Sem
            {'paper_id': '22588', 'paper_name': 'Algorithm Design', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1nv3m_GI9-h5gjU2goABDZ5VnVkWj6aLs/view'},
            {'paper_id': '22587', 'paper_name': 'Soft Computing', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/13nxFh-UA6Y2NeyafeC8JMBBjxhnlJoV6/view'},
            {'paper_id': '22508', 'paper_name': 'Optical Communication', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/13ZWGpfgnmNErE7qJnSzmKHKN-24Pku0I/view'},
            
            # 3rd Sem
            {'paper_id': '32582/32584', 'paper_name': 'Network Security', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/17zYfpaS7OI8YsfGjPv2VKeVnixINMDYH/view'},
            {'paper_id': '32604', 'paper_name': 'CDMA', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/17zYfpaS7OI8YsfGjPv2VKeVnixINMDYH/view'},
        ]

        for paper in papers_data:
            IGUMtechPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'M.Tech',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all M.Tech papers!'))