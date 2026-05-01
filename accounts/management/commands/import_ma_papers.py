from django.core.management.base import BaseCommand
from accounts.models import IGUMaPaper

class Command(BaseCommand):
    help = 'Import IGU MA papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '12203', 'paper_name': 'English British Drama', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1JIGC2GAsbTWXTxCsvcxPS_xwVIIgUDhZ/view'},
            {'paper_id': '12209', 'paper_name': 'English British Novel', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1wFAJRtayGTzd4hXylXFHb9c7weOtECw-/view'},
            {'paper_id': '12207', 'paper_name': 'English British Poetry', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1zC02DYNmdkbzjyNLgGHaXVpqKX-Hekdo/view'},
            {'paper_id': '12210', 'paper_name': 'English British Prose', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1pQHlRAK_En9ODam8ISZSb8UCC97BYfXs/view'},
            {'paper_id': '12201', 'paper_name': 'English Reading Writing and Documentation Skills', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/16LzvRGrvcjsyQQi7IXi9DyX77TLdQOAd/view'},
            {'paper_id': '12704', 'paper_name': 'Common Value Education', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1G9OPneflnlJ_iv1FvXdsk9BnphNIwtta/view'},
            {'paper_id': '12705', 'paper_name': 'Communication Skills and Personality Development', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1VdyoYNAXDns_4rx1DmkkGhU5_2GyaGsE/view'},
            {'paper_id': '12706', 'paper_name': 'Computer Application', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1BaeVpAz06KIn0jGWnTOZzAx8664Ne2ko/view'},
            {'paper_id': '12706', 'paper_name': 'Computer Application', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1aK8g4lVgc1KR18rKOCpL_x5UTJQc-8Ul/view'},
            {'paper_id': '12234', 'paper_name': 'Medieval Societies', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1THsT0J970HpHtW28_t8JfURK6cOTHQoE/view'},
            {'paper_id': '12252', 'paper_name': 'Western Political Thought', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1nu21ppcE1AEG8V_Bd2aWUnZviWsbl2zB/view'},
            {'paper_id': '12207/12213', 'paper_name': 'British Poetry', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/17TREQrqR3W39DT2nUqgNImPtFuoj1p9t/view'},
            {'paper_id': '12234', 'paper_name': 'Medieval Societies', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1THsT0J970HpHtW28_t8JfURK6cOTHQoE/view'},
            {'paper_id': '12227', 'paper_name': 'Source of History', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1vf20cXDjANbHxwVCukb2aboXVRP8DiDI/view'},
            {'paper_id': '14201', 'paper_name': 'History of English Literature', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1FEwG-ME-nuQHgFYZTjY4Iky-lFfNzqas/view'},
            {'paper_id': '12212', 'paper_name': 'Reading of Writing Skill', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1hgXYGIN1fZaRgRcsfBbzvVAXwYxPkihw/view'},
            {'paper_id': '14225', 'paper_name': 'State of India', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1J7LT4FbztHw2pmpiZrEFREpSE1rVPvO4/view'},
            {'paper_id': '12216', 'paper_name': 'British Prose', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/18E4HrrS9HPvMSowKJcd62wqkragpNm29/view'},
        ]

        for paper in papers_data:
            IGUMaPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'MA',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all MA papers!'))