from django.core.management.base import BaseCommand
from accounts.models import IGUBscPaper

class Command(BaseCommand):
    help = 'Import IGU BSc papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1JcPaDYTfFZWkFp_5uOBV1_ttz2VJI0GB/view'},
            {'paper_id': '5122', 'paper_name': 'Physics Properties of matter and kinetic theory of gases', 'semester': '1st', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1QzR_JUMEbEw9EeQXvEXP_L2HLp1gjp2y/view'},
            {'paper_id': '21222', 'paper_name': 'Zoology-II', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1-f9TYlJ8-tjpVVpTCcvzARRzlQXXTwmH/view'},
            {'paper_id': '22703', 'paper_name': 'Communication Skills and Personality Development', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1IQ2O0R6l-ss_85GYPjCnAM62dHgD2L3z/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1wX8M0V26BWSAWwXU-E6G8Zo4-SRPPaGL/view'},
            {'paper_id': '21211', 'paper_name': 'Botany-I Diversity of Archegoniate', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Fvy0szt8In0xJgF9keG56qWJezdOHSwJ/view'},
            {'paper_id': '21202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1ugDAIrzcwQHi8YBEqD1zfB3WouBEe_3c/view'},
            {'paper_id': '21203', 'paper_name': 'Chemistry-III Organic Chemistry', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1q7n13e37LuDNedt9H6B2aSskerBxiVjA/view'},
            {'paper_id': '21381', 'paper_name': 'English', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1CGVWb1-SbF67MEgmg14ZBcGOX5nBKq6L/view'},
            {'paper_id': '21251', 'paper_name': 'Hons - Mathematics Number Theory and Trigonometry', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Vr8AjX7876EqUm4_kwHNwoT8hBRZRNES/view'},
            {'paper_id': '21201', 'paper_name': 'Inorganic Chemistry', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1-wlHi4oVCmeUyd4ThRCgIk_p1879_qx0/view'},
            {'paper_id': '21221', 'paper_name': 'Zoology-I Life and Diversity form Annelid to Hemichordate', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1eThZzw_pC66CPkSh-JNBBGfb3_sHra82/view'},
            {'paper_id': '21222', 'paper_name': 'Zoology-II Genetics', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Kh2Rbe2OLJlFHGAgzguFiIm4MFb0JWxf/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Education', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1B24ZNtkYkDkB3fVuep2MhrvH8olO8FnE/view'},
            {'paper_id': '21212', 'paper_name': 'Botany-II Genetics', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/15C-v2QrFWrL0SP3hI1-RsHyHjYS2vAub/view'},
            {'paper_id': '21201', 'paper_name': 'Chemistry-I Inorganic Chemistry', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ImRJM-ipTg0YROODx8lXuNuqlCLKBjy6/view'},
            {'paper_id': '21202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1UmQpaOICAKqy7yxr8VzImw_evsPDVUKV/view'},
            {'paper_id': '27652', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/18HahP-BaS--eQDIZ3VBL0wpg01abVFh5/view'},
            {'paper_id': '27084', 'paper_name': 'Indian Society and Culture', 'semester': '1st', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1aP5rqqWJwbaaKFuThMPoJ86X23zKLte6/view'},
            {'paper_id': '27271', 'paper_name': 'Pteridophytes Gymnosperms and Fossils', 'semester': '1st', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1373vwmvOUUhEgGUKr8rv0Q4XPudCRATz/view'},
            {'paper_id': '22999', 'paper_name': 'Basic Computer Education', 'semester': '1st', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/128VxRz_WWDEzOWZawavUxVwBgX8U60xH/view'},
            
            # 2nd Sem (3rd & 4th year data - 3rd sem)
            {'paper_id': '31181', 'paper_name': 'Advanced Calculus', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1oU9dQ3t4lNxLG8VTcloAj-rYk5iJbA0K/view'},
            {'paper_id': '5210', 'paper_name': 'Organic Chemistry', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1UjVJA_EE3gq8JL-C7WedtVZ-svAQyu8q/view'},
            {'paper_id': '31561', 'paper_name': 'Hindi', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1EmdX8HkJm99eXyngGoez80j6I5aDqUJN/view'},
            {'paper_id': '31201', 'paper_name': 'Inorganic Chemistry', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1JlBACen1tlLpcDVFBFN-Gv7Tdx2WJ3Xc/view'},
            {'paper_id': '31182', 'paper_name': 'Partial Differential Equations', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1HQbc-iwKu_rcvR-RbObeTeRPZStB-lv5/view'},
            {'paper_id': '31202', 'paper_name': 'Physical Chemistry', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1XHEAHRi0VlNuRXoc-o_vCFf0hIxwevQV/view'},
            {'paper_id': '31192', 'paper_name': 'Physics Optics', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1PI1TOBXW3jYNH0qOAJ9EijzpSGWiGWhs/view'},
            {'paper_id': '31183', 'paper_name': 'Statics', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1jFX9VhwwZugvgXYV1zJFD03pfYKkG3dh/view'},
            {'paper_id': '31211', 'paper_name': 'Botany-I Biology and Diversity of Seed Plant', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1_uQ6G5XdUqWtWtKAmH5qZ7fyHwdnN8km/view'},
            {'paper_id': '31212', 'paper_name': 'Botany-II Plant Anatomy', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1qHKRn9d0Tj-Gfq2tRgNUFh2B3vRYaPws/view'},
            {'paper_id': '31201', 'paper_name': 'Chemistry-I Inorganic Chemistry', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/15onmRePjJWsbjABzyXl4AmQ38Zc3I5BZ/view'},
            {'paper_id': '31202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1KzU4-E5copoG5NjXm1BGG57OFWkXQ0JW/view'},
            {'paper_id': '31203', 'paper_name': 'Chemistry-III Organic Chemistry', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1c3g0fZZ4IAM4fO5ovM8DzC-nTcpL99BE/view'},
            {'paper_id': '31561', 'paper_name': 'Hindi', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/15A6DRSxuZghQ3WG9L5lBd4PsvWI3MGmL/view'},
            {'paper_id': '31181', 'paper_name': 'Mathematics Advanced Calculus', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1pbTQiw9WDP-UtnDqPcWo7OJeJneqcY2H/view'},
            {'paper_id': '31192', 'paper_name': 'Physics Optics', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1oqimopBRDhvYiOPeRmSURxmH7SnCMNA3/view'},
            {'paper_id': '31571', 'paper_name': 'Sanskrit', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1GQFNUWikfrMue8WGHKixLmb1vM_dMT54/view'},
            {'paper_id': '31221', 'paper_name': 'Zoology-I Life and Diversity of Chordates-I', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1TwrBx7MotoR7mI7TRSLhFZhU0U0W9izU/view'},
            {'paper_id': '31222', 'paper_name': 'Zoology-II Mammalian Physiology', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1MlTfa9NETygzIaMJ5pO8bZ5Y89D2ZY1Z/view'},
            {'paper_id': '5212', 'paper_name': 'Chemistry Inorganic Chemistry', 'semester': '4th', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1yx2TDqSzU9Z_gTsbTv3Vh2kMGaHVTg_L/view'},
            {'paper_id': '41202', 'paper_name': 'Physical Chemistry', 'semester': '4th', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1fuvdjlEyt4WbNMQ1ZNb_yBM-HWDbITB9/view'},
            {'paper_id': '41201', 'paper_name': 'Chemistry-I Inorganic Chemistry', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1l762tcS2CBZtV9bVP_ayzs93kycgWQ4b/view'},
            {'paper_id': '41202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/10-TbEheI2MiU1nzxuPBwtN6-pRrDDZaK/view'},
            {'paper_id': '41203', 'paper_name': 'Chemistry-III Organic Chemistry', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1f4tFZQVf1jXEtLOBWsS6j7lfIGRBfm4_/view'},
            {'paper_id': '41561', 'paper_name': 'Hindi', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1HdENQYXErxUjIRcA0Zr3o9lqfKz30uIE/view'},
            {'paper_id': '41181', 'paper_name': 'Mathematics-I Sequences and Series', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1mZwp7_Fkrig8KVTqHisngu2n0J7rB5bu/view'},
            {'paper_id': '41182', 'paper_name': 'Mathematics-II Special Functions and Integral Transforms', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1xcKiMmCsC2JIEsWMdePui_iOTgILvDKq/view'},
            {'paper_id': '41183', 'paper_name': 'Mathematics Programming in C and Numerical Methods', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1bkuz569wpZOdv0BdvDZtmCEdnYM3nRFx/view'},
            {'paper_id': '41191', 'paper_name': 'Physics-I Statistical Mechanics', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1keh9rOXUnJ5BnN-AiuSNgxWoB_Nn4y08/view'},
            {'paper_id': '41212', 'paper_name': 'Botany-II Plant Embryology', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1z2P6QC10UUK-QB9mcFIS8Z1BeP6RnIrb/view'},
            {'paper_id': '41211', 'paper_name': 'Botany Biology and Diversity of Seed Plants-II', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1FFgVYpCIZDmIBM-R_XprmOTYzTGgZaMP/view'},
            {'paper_id': '41201', 'paper_name': 'Chemistry-I Inorganic Chemistry', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1iJfNn3pE-24WVkIVhn5JtvZDakslKeV3/view'},
            {'paper_id': '41202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/18p2tuEWtO38n2m7y3EP-0qrQV3htISte/view'},
            {'paper_id': '41203', 'paper_name': 'Chemistry-III Organic Chemistry', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1KqVgumjQAOtlPic_fWivZZVNrysn52oa/view'},
            {'paper_id': '41232', 'paper_name': 'Computer Science Operating System', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1UgBJFkb2GSSSn6K2OKmwfM1tFKmVlkOO/view'},
            {'paper_id': '41561', 'paper_name': 'Hindi', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1M_kbmNMKMEhPo2hLMn0kSaD_ZWP8c0V0/view'},
            {'paper_id': '41221', 'paper_name': 'Zoology-I Life and Diversity of Chordates-II', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1E6sy0qaG4QY5JrFgjeBnacxl6LVOpJFT/view'},
            {'paper_id': '41222', 'paper_name': 'Zoology-II Mammalian Physiology-II', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1yuFBSO4IVWUNc8kInhgLqEfzfcssK3G4/view'},
            {'paper_id': '41201', 'paper_name': 'Chemistry-I Inorganic Chemistry', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1ouO-EdZc_1YCJxXSr5WQuMlFo0QxOXYp/view'},
            {'paper_id': '41202', 'paper_name': 'Chemistry-II Physical Chemistry', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/12M6tl01hOS85kIbdvG9zoNfaNX7Cz0AP/view'},
            {'paper_id': '41203', 'paper_name': 'Chemistry-III Organic Chemistry', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1KKqSzWk_hthjZ04vyzYP6HPnHBne6Gxn/view'},
            {'paper_id': '41181', 'paper_name': 'Mathematics-I Sequences and Series', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1ILkBLh7nLLsvcq1cfvACRZweFn5QFXpT/view'},
            {'paper_id': '41182', 'paper_name': 'Mathematics-II Special Functions and Transforms', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1IMR8M_MvYNdit4lcAtSPl_Ug7OoRUYgu/view'},
            {'paper_id': '41191', 'paper_name': 'Physics-I Statistical Mechanics', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1CX0Yclcrk7NS4wXHnlgZ52MLBmNwip0_/view'},
            {'paper_id': '41192', 'paper_name': 'Physics Optics-II', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/10G7adzNMVASg6eKc0dgXbbIax4RjfIyE/view'},
            {'paper_id': '41571', 'paper_name': 'Sanskrit', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1RA3Q5g-kBhvpFRPZwIQ6jI4DPs5gvfxV/view'},
        ]

        for paper in papers_data:
            IGUBscPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'BSc',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all BSc papers!'))