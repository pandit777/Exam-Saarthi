from django.core.management.base import BaseCommand
from accounts.models import IGUBcaPaper

class Command(BaseCommand):
    help = 'Import IGU BCA papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '11321', 'paper_name': 'Computer and Programming Fundamental', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1DtnZ_OwG7pUV675v8NKR4pu1DlbCBCNu/view'},
            {'paper_id': '11324', 'paper_name': 'Logical Organization of Computer', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1v4-OTp3UpgHaz_qBopJyiHRbhA93Nvds/view'},
            {'paper_id': '11323', 'paper_name': 'Mathematics', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1su5F1jpOEhRHfyDLG6B1KDaGauhQB-CH/view'},
            {'paper_id': '11322', 'paper_name': 'PC Software', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/11WWC1Jz6GXpU6JSG-ItVm5mFSQ16bMTa/view'},
            {'paper_id': '11321', 'paper_name': 'Computer and Programming Fundamental', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/105TKMGB10THYdl9HrjtpksEGFUgwJ9lv/view'},
            {'paper_id': '11321', 'paper_name': 'Computer and Programming Fundamental', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1r6RfddKUaNMG_UnZH85LD8MZYjDyRYHu/view'},
            {'paper_id': '11322', 'paper_name': 'PC Software', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1TKQfLmFksld7QvgNYehaw1PBboUw2m9C/view'},
            {'paper_id': '11323', 'paper_name': 'Mathematics', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1cFc9w5m53IgJ33tso9vL7_tEZxg7t-_T/view'},
            {'paper_id': '11323', 'paper_name': 'Mathematics', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1VgNITfpYyO_LGguoiwOZ8KQbFaLL-bLj/view'},
            {'paper_id': '11324', 'paper_name': 'Logical Organization of Computer', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/18FG6FBnj-ntTiQYLCRRxs7xdT9KBmmt9/view'},
            {'paper_id': '11324', 'paper_name': 'Logical Organization of Computer', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1flG2p3dw0ld1OtJXkJmj8AhoLuRaDJoO/view'},
            {'paper_id': '11324', 'paper_name': 'Logical Organization of Computer', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1y8bfRzPny_huDTu2GXzm39ntCmJnr-x9/view'},
            {'paper_id': '11323', 'paper_name': 'Mathematics', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1LwuOzUFzai101IETrZAGj9oKByDnm4ZE/view'},
            {'paper_id': '17671', 'paper_name': 'English Language and Communication', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1yi5tiJ9LNVQtIwlbxZNo-2LTWQvO0UjR/view'},
            {'paper_id': '17672', 'paper_name': 'Hindi Bhasha aur Vyakaran', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1tydCfVC-y4ROhQwcJO9-wRIqVz0ToEbc/view'},
            {'paper_id': '11321', 'paper_name': 'Computer And Programming Fundamental', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1v58Ov94dRkN-EU7anGBo3MoUnlpqJ_QM/view'},
            {'paper_id': '17652', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1rPQjYUB3pci12WaN4nsdQ0XYu_IYYoT5/view'},
            
            # 2nd Sem
            {'paper_id': '22999', 'paper_name': 'Computer Awareness-I', 'semester': '2nd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1C13C7p0UZoGb19GMVoJWt4MAgVvJgVui/view'},
            {'paper_id': '22703', 'paper_name': 'Communication Skills and Personality', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1QlIClYc14dtTHKT-scBpnyTLMXyWrQhj/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1QuqcR6h7SrvWEq9Co2OtX3YDFn0YYAH5/view'},
            {'paper_id': '21321', 'paper_name': 'C Programming', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/13L689dvbw_EMyApW2Tg8ZlAK4cz3fqy2/view'},
            {'paper_id': '21322', 'paper_name': 'Logical Organization of Computer-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Om6gvcWjYgu4iMdz5IZ8iBM5AdkuvPki/view'},
            {'paper_id': '21323', 'paper_name': 'Mathematical Foundation of Computer Science', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1i3Awz_oHKPV1A6T4md5PVH-6ARYbO6pn/view'},
            {'paper_id': '21324', 'paper_name': 'Structure System Analysis and Design', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1e_OcTrnSvmL8GqbnFXWr_eqnS78KuZ7K/view'},
            {'paper_id': '21321', 'paper_name': 'C Programming', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1XiDC4dNbq39o83B59PW61bNfhYS84Zja/view'},
            {'paper_id': '21324', 'paper_name': 'Structure System Analysis and Design', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1-iefqBqAZBfzWWvGJ4oc-xNZUbtyktv4/view'},
            {'paper_id': '21324', 'paper_name': 'Structure System Analysis and Design', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1wuct3kEX7wrLWXAI0IkcOaUH5rmgpny7/view'},
            {'paper_id': '21322', 'paper_name': 'Logical Organization of Computer-II', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1EgxvfpngGs0Ij0STn-Uec92ENjmUGQBM/view'},
            {'paper_id': '21322', 'paper_name': 'Logical Organization of Computer-II', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1TJgdLXDKcLT0toBZp-T-d0GokiO6Zfci/view'},
            {'paper_id': '27652', 'paper_name': 'Environmental Studies', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1M2OKe2YCRnaaavvb7B2s5jg_YtZbBGXR/view'},
            {'paper_id': '27084', 'paper_name': 'Indian Society and Culture', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1MoXc5w7aGGo2VcE-9WMZ8pDPwxdaHjO1/view'},
            {'paper_id': '21271', 'paper_name': 'Pteridophytes Gymnosperms and Fossils', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1vb2CQLTRPEKi8Zwu3ILM-23OeICMVoY4/view'},

            # 3rd Sem
            {'paper_id': '31322', 'paper_name': 'Data Structures', 'semester': '3rd', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1BfEX4-bH5lKHXx12xaS2TvpyrgVgYhkH/view'},
            {'paper_id': '31322', 'paper_name': 'Data Structures', 'semester': '3rd', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1RB4s6rjchXE4_g8eJsTzOTJLRD0HNC7w/view'},
            {'paper_id': '31323', 'paper_name': 'Introduction to Database System', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/18ttX0eMXK_oHqfRAqeNah4SVosj7OTXR/view'},
            {'paper_id': '31321', 'paper_name': 'Introduction to Operating Systems', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1H_VOR1LM8LQ6cM-s_7GpNJouSOTNsf-2/view'},
            {'paper_id': '31324', 'paper_name': 'Communication Skills English', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1nFG8KZvnWIcCAuaaYyrek5NT65SO79nL/view'},
            {'paper_id': '31322', 'paper_name': 'Data Structures', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1mh41uYlpgwk4Kt0yCqLm-ol1h0842G2a/view'},
            {'paper_id': '31323', 'paper_name': 'Introduction to Database System', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1zU5buv-5BSsWJVY1mljOcBr6gY_XkzS_/view'},
            {'paper_id': '31323', 'paper_name': 'Introduction to Database System', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1XNkNrNzN0H63F9NsYq4Y0A7eSrfy6fHG/view'},
            {'paper_id': '31321', 'paper_name': 'Introduction to Operating Systems', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1d77pc7Fk3A2Zrmf2KGB2gT0QbIlsnYk9/view'},
            {'paper_id': '31321', 'paper_name': 'Introduction to Operating Systems', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1S78qRdwNDB1Txw0-lER6diKIFn4r-VUO/view'},
            {'paper_id': '31322', 'paper_name': 'Data Structures', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1v1VugKJvjMwZscbzSe80r9vuTHaNCrsn/view'},
            {'paper_id': '31324', 'paper_name': 'Communication Skills English', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1bM_WZZ3xUPqQtKG8m8QNpkEjBPqq8w_S/view'},

            # 4th Sem
            {'paper_id': '41322', 'paper_name': 'Data Structure-II', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ISKHBLpQcGdY7c2rHQ2HUsFmb66qGjw0/view'},
            {'paper_id': '41323', 'paper_name': 'Object-Oriented Programming Using C++', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ttKqPatJBo33vx1ufzuttFxeEHi6vdC_/view'},
            {'paper_id': '41324', 'paper_name': 'Software Engineering', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1txV1y9z-MbjQ55zE3HqjfKKMnRGIHlU_/view'},
            {'paper_id': '41321', 'paper_name': 'Web Designing', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Mz733Gu2Qf-ssTGwT5WsGaN2oqdOBFWw/view'},

            # 5th Sem
            {'paper_id': '97678', 'paper_name': 'Computer Graphic', 'semester': '5th', 'year': '2017', 'pdf_link': 'https://drive.google.com/file/d/1J5oB3ejFWIg7uFE-lIPEmnHMGHphThyd/view'},
            {'paper_id': '51321', 'paper_name': 'Management Information System', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1Uulka_fmjXXeLqENNwiew6qtciKbWbp6/view'},
            {'paper_id': '51324', 'paper_name': 'Visual Basic', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/16ncp7xltljNOlZxToSau8wuK-rjrMXAz/view'},
            {'paper_id': '51322', 'paper_name': 'Computer Graphic', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1lpeCYnDJeQX1oWU8-2aFW025JbgoFpyM/view'},
            {'paper_id': '51322', 'paper_name': 'Computer Graphic', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/16T0MYd_L434YX-bypTTn6_GxEWT-n3Ib/view'},
            {'paper_id': '51323', 'paper_name': 'Data Communication and Networking', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1yoNRC0vIBDM0qB_zNAmoRYxsqOIbprFN/view'},
            {'paper_id': '51324', 'paper_name': 'Visual Basic', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1-HDKoygDM-eUQ0LxSSoa2Rbj4hlyxDOy/view'},
            {'paper_id': '51323', 'paper_name': 'Data Communication and Networking', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1gIw0kTJ47S9uSHuRh6f_ISgy1FOlSOD2/view'},
            {'paper_id': '51322', 'paper_name': 'Computer Graphic', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1AtzbVevMPg3ZQsIf3XZGjS5N2KJj9uHp/view'},
            {'paper_id': '51321', 'paper_name': 'Management Information System', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1IaXDEUaPk41zSXA7G9v0A3EuV71F1Htn/view'},
            {'paper_id': '51324', 'paper_name': 'Visual Basic', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Hjp-CKDVjIKhDGM5Ov_ymPAQNtmtgRGQ/view'},
            {'paper_id': '51323', 'paper_name': 'Data Communication and Networking', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1dp4oaBEjdvE3kx4xh985CNB7RIOuyHLf/view'},
            {'paper_id': '51322', 'paper_name': 'Computer Graphic', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1NKMlNmCezd563WLi_pdgptwge9RluIE_/view'},
            {'paper_id': '51321', 'paper_name': 'Management Information System', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Jk121rj8q4uIJUiJiTmgmDy9ZFGhifTp/view'},

            # 6th Sem
            {'paper_id': '61323', 'paper_name': 'Artificial Intelligence', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1gUtJcG625-ysik1894IjjjcrC_YVY_Dd/view'},
            {'paper_id': '61321', 'paper_name': 'E-Commerce', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1lPg0wP1JaKgEgtwUkwNbBWPhUr5z65H4/view'},
            {'paper_id': '61324', 'paper_name': 'Introduction to Dot-Net', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1udxQfn2-7FHJ-iJ5HOafhsmuPkm1dkSG/view'},
            {'paper_id': '61322', 'paper_name': 'Object Technologies and Programming', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ZYftzSZPktv27QfJyLbPKu2iD4xEqfAg/view'},
        ]

        for paper in papers_data:
            IGUBcaPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'BCA',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all BCA papers!'))