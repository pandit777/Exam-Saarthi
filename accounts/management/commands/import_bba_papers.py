from django.core.management.base import BaseCommand
from accounts.models import IGUBbaPaper

class Command(BaseCommand):
    help = 'Import IGU BBA papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '11311', 'paper_name': 'Business Organization', 'semester': '1st', 'year': '2017', 'pdf_link': 'https://drive.google.com/file/d/1CfoDJ5S3weSGkkMCUAX_DEoyAMARqFjb/view'},
            {'paper_id': '11313', 'paper_name': 'Financial Accounting', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1u-9uYaI5dig9LlbHjdXzNeMjFnFGZLc5/view'},
            {'paper_id': '17671', 'paper_name': 'English Language and Communication Level-1', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Rte84fra3QckIRgs6p2Hrfap0DmdhTro/view'},
            {'paper_id': '17652', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1VArmh8NYp-JSJdScZQwH3Cf7gpHaOUsR/view'},
            {'paper_id': '17672', 'paper_name': 'Hindi Bhasha aur Vyakaran', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1s3KXHv46NTkR-TotDAv7OWQLouUrEazO/view'},
            # 2nd Sem
            {'paper_id': '22999', 'paper_name': 'Computer Awareness-I', 'semester': '2nd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1dhEGUEBJjwpBQCDvwMX3M7dziIq0AGyj/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1o4XDicwQlZdbZ8ksQa_BGcrIFaFk56je/view'},
            {'paper_id': '22703', 'paper_name': 'Communication Skills and Personality Development', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/186GjEgfdHF1BY0ZDEbkYqm-2GaH9uak5/view'},
            {'paper_id': '21314', 'paper_name': 'Computer Application in Management', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1zZwkqxO4TMamZ6ishTHI3TCeTnnJNGyI/view'},
            {'paper_id': '21316', 'paper_name': 'Business Statistics', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ZDdGRY-iJ69cAmncqipvKmIn1FFvjxEM/view'},
            {'paper_id': '21312', 'paper_name': 'Macro Economics and Policy', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Is4sDwwfYkHGQH0uO49YaE6uFTLuF7Zl/view'},
            {'paper_id': '27652', 'paper_name': 'Environmental Studies', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1CBSN26oKyDzk8kkHDMCADmQIwu8uifRi/view'},
            {'paper_id': '27084', 'paper_name': 'Indian Society and Culture', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1iJImwqrBp89TZ3bUQ6HhY0MsTtxO2xzu/view'},
            {'paper_id': '27271', 'paper_name': 'Pteridophytes Gymnosperms and Fossils', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/12pevH7LFPOcFAPo_VscWSLU3OLCjEpfQ/view'},
            # 3rd Sem
            {'paper_id': '31316', 'paper_name': 'Disaster Management', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1REKDk7Y4gRsGJu8V6mbSQhkPILLdEITu/view'},
            # 4th Sem
            {'paper_id': '41314', 'paper_name': 'Business Law', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1jIB3x8g64cf4i4haaudEaEe6wr6_dDN5/view'},
            # 5th Sem
            {'paper_id': '51315', 'paper_name': 'Presentation Skills and Personality Development', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1HfvN16DGFUhr37XsvNa3F6Y5cGd_ubWR/view'},
        ]

        for paper in papers_data:
            IGUBbaPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'BBA',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all BBA papers!'))