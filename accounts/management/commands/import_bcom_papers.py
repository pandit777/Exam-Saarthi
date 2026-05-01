from django.core.management.base import BaseCommand
from accounts.models import IGUBcomPaper

class Command(BaseCommand):
    help = 'Import IGU B.Com papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # 1st Sem
            {'paper_id': '11343', 'paper_name': 'Business Economics', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1THrlm13jC0PwccdnpHgmR9ymbZreBOeO/view'},
            {'paper_id': '11344', 'paper_name': 'Business Management', 'semester': '1st', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1f6jnRE7Vremrnlo7Nfjih7tP7Xw9dSqD/view'},
            {'paper_id': '50501', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1NnNOhdMYK4H3FOmhbUF184RS8D18QrhP/view'},
            {'paper_id': '4056', 'paper_name': 'Basic Of Computer', 'semester': '1st', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1Y9TT8inFX69OmEfkrKswZkRweiDpw5uE/view'},
            {'paper_id': '4803', 'paper_name': 'Micro Economics', 'semester': '1st', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1EWJLp1U1IlEBRGdZ2nmEHYTsIkKatBJ_/view'},
            {'paper_id': '11345', 'paper_name': 'Business Communication Skills', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1d_am0jLdw9fjjdYvrjm049dN4Cq-OV1T/view'},
            {'paper_id': '11341', 'paper_name': 'Financial Accounting', 'semester': '1st', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/161vO2G0ZFXAoIILMAhb9EmFJZD7pUEtw/view'},
            {'paper_id': 'Not Available', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1t8mQvXDbumFUbq4pIhPCKZL86lOhLEwM/view'},
            {'paper_id': '11345', 'paper_name': 'Business Communication Skills', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1GifJ6KwfhojZVOczlOdHXBnrsuyV05Q8/view'},
            {'paper_id': '13005', 'paper_name': 'Indian Banking System', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1bPxhFTmtfY6BbMdsxLG_rICqN7Y5bG-L/view'},
            {'paper_id': '11343', 'paper_name': 'Business Economics', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1loBVS8mexrBoSicB9qZeDLy7BFiRKVol/view'},
            {'paper_id': '11344', 'paper_name': 'Business Management', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1EDdPYi-cNNAbNEhiaaUFX3irux_FDXyz/view'},
            {'paper_id': '11342', 'paper_name': 'Business Mathematics', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1wxK8HQU6A_7mvMnfH9m0vXtSWhkgPRov/view'},
            {'paper_id': '11341', 'paper_name': 'Financial Accounting-I DEC', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1-qnTzpCsoOKaLdt_UH6XSDi18WNE4InW/view'},
            {'paper_id': '11341', 'paper_name': 'Financial Accounting-I JAN', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1qaL26_N8Y7GW3ZFOnXSMaRHVhI5SkK4F/view'},
            {'paper_id': '17652', 'paper_name': 'Environmental Studies', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1VjBURlDR6M8mY0nxbmELK52yqf4DMhuI/view'},
            {'paper_id': '17671', 'paper_name': 'English Language and Communication Level-I', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/146sDLc6no8AkWQ_irX6XVpwtbsaY1hwH/view'},
            {'paper_id': '17672', 'paper_name': 'Hindi Bhasha Aur Vyakaran', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1zr9Xhv0U67IsUhO4Alnk5haJskIqZ_Ra/view'},
            # 2nd Sem
            {'paper_id': '4482', 'paper_name': 'Corporate Accounting', 'semester': '2nd', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1C6ro0Zm2ztZ6HDBBBNFMscwjkmDhVExH/view'},
            {'paper_id': '4484', 'paper_name': 'Micro Economics', 'semester': '2nd', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/11wV2VpKWFUO4FAli-FtEGfKZcK-WZTm8/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness-I', 'semester': '2nd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1JeQTiUXZqhEE_TWqJyBJHA8WRJSMmYdG/view'},
            {'paper_id': '21341', 'paper_name': 'Financial Accounting-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Y-_c0owkVUBtfuU9QntKQEy2B-1AgPJJ/view'},
            {'paper_id': '21344', 'paper_name': 'Business Mathematics-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1hNlWWNSpXyc6HD1eVzPsT_UES9u84-wh/view'},
            {'paper_id': '21342', 'paper_name': 'Business Mathematics-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/15OEVvlmIuRtl41E0VQtxDHvXCazeNYbc/view'},
            {'paper_id': '21345', 'paper_name': 'Business Environment-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1U6WKq9gMsIGUEN7oBEdg_mosf-hjg1uU/view'},
            {'paper_id': '21343', 'paper_name': 'Business Economics-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1kdF4MMFjMznY7kVWWuU1IyZOlM5sjTsc/view'},
            {'paper_id': '21346', 'paper_name': 'Basic of Computer-II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/12gGIEtcBix52MQOiBeiN11C0-4Ha0D8L/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/11gEOsVBtUYrQz_VNoGylMlINMyWnlcfd/view'},
            {'paper_id': '22703', 'paper_name': 'Communication Skills and Personality Development', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/15xLU2N6y4vWXOwrS0n816pUDrUDCF4vw/view'},
            {'paper_id': '21341', 'paper_name': 'Financial Accounting-II', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Pw5FMo-JPxmMLw4tVZg70-SLHSCLUBMh/view'},
            {'paper_id': '23001', 'paper_name': 'Financial Accounting', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/102eV763VcnW9D7fZct32MSImdvjMFa65/view'},
            {'paper_id': '21652', 'paper_name': 'Environmental Studies', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1zUt7a-ZY7xOFU2c64dKGRG7DweJc5ToX/view'},
            {'paper_id': '27084', 'paper_name': 'Indian Society and Culture', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1KOBYrV061JXKvgVa-WB_3c-HrVqRjgPq/view'},
            {'paper_id': '27271', 'paper_name': 'Pteridophytes Gymnosperms and Fossils', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/141RHZzb6ZQYEsvp8gVtfeukjO8xaaeLJ/view'},
            # 3rd Sem
            {'paper_id': '31345', 'paper_name': 'Human Resource Management', 'semester': '3rd', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1wAFaAmMBbijNXgSejl0wOyPwsfqwk6ir/view'},
            {'paper_id': '31342', 'paper_name': 'Business Statistics-I', 'semester': '3rd', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1w4sqYch2Q5sTRPQq5fG_L0OjDzie25sv/view'},
            {'paper_id': '31346', 'paper_name': 'Fundamental of Insurance', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1IQ8Jt0K9HChAjVGEx1NcqBXhyV4BTV3S/view'},
            {'paper_id': '31343', 'paper_name': 'Business Regulatory Framework', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1Haxo4osZiv6puN_Yj2AHztlkMScASyqc/view'},
            {'paper_id': '33002', 'paper_name': 'Cost Accounting', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1GmC7Mcjm-zaslv7RRfDQZLD_YmS6wrSw/view'},
            {'paper_id': '31343', 'paper_name': 'Business Regulatory Framework', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Un72HFkJ-jHsEhG9nj__wZrQuB9dGAzl/view'},
            {'paper_id': '31345', 'paper_name': 'Human Resource Management', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1h5ygloRnstYmV94mFOX4TxCfDK75vpvV/view'},
            {'paper_id': '31348', 'paper_name': 'Production Management', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1zG8bAu6JYfIfk_3wgYqrSdnD-djkqKBV/view'},
            {'paper_id': '31346', 'paper_name': 'Fundamental of Insurance', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1OM3hhmnia4rdahsCQueGH6NgIEzfZunJ/view'},
            {'paper_id': '33006', 'paper_name': 'Business Mathematics', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1SUgYNpocMpPQkbm_WkVy2E6lxGBhisiN/view'},
            # 4th Sem
            {'paper_id': '8618', 'paper_name': 'Advertising', 'semester': '4th', 'year': '2020', 'pdf_link': 'https://drive.google.com/file/d/1EO0fyXUgoDbYKqTXb7itLyHWeZPHGypv/view'},
            {'paper_id': '41347', 'paper_name': 'Banking and Banking Law', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1UnQfgNWzYYTQbMEIvZ0b_sAOXPnJFoJA/view'},
            {'paper_id': '41343', 'paper_name': 'Business Regulatory Framework', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1JFX5o8_lyxZDEPmtyoONWAXhStkhTReR/view'},
            {'paper_id': '41342', 'paper_name': 'Business Statistics-II', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1tcbcEo26dGo_ZniGuUTRBeCZB4YKxQ0z/view'},
            {'paper_id': '41341', 'paper_name': 'Corporate Accounting', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1QBc9Ud7i6quTgsyELd-6ZBOPjEVmhIXZ/view'},
            {'paper_id': '41344', 'paper_name': 'Corporate Law-II', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/13O0jYHZRqBv6XbaR2tVATFDXAH-BRN8b/view'},
            {'paper_id': '41345', 'paper_name': 'Marketing Management', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1f13fA46vV8kCSPr2Ep2TkbfhY_obM0sM/view'},
            {'paper_id': '43004', 'paper_name': 'Goods and Service Tax', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/14zfbm3tQJUxmxpHKr4TG4Wm2IQaearup/view'},
            {'paper_id': '41347', 'paper_name': 'Banking and Banking Law', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1AGZYxg0OAwYYIIJzlp_xllLeC9lzMXtZ/view'},
            # 5th Sem
            {'paper_id': '51343', 'paper_name': 'Accounting for Management', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1uyTMAGZywEMYdWpJGDfO304QaSl9kNsU/view'},
            {'paper_id': '51342', 'paper_name': 'Cost Accounting-I', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1-_PoplCMuivnFDrFyRWAUZcmKdb7D9XJ/view'},
            {'paper_id': '51345', 'paper_name': 'Entrepreneurship and Small Business', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1cGud6BSPXAwhXX_cnQtPRKcdBT-3orXI/view'},
            {'paper_id': '51344', 'paper_name': 'Financial Market Operations', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1T-JMcZeYp18OOzUdY72b0Ho9g66TlGL7/view'},
            {'paper_id': '51349', 'paper_name': 'International Business Environment', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/17w9qGICzanwrnn5YC-wft-4U2YzuWJ-I/view'},
            {'paper_id': '51341', 'paper_name': 'Taxation Law', 'semester': '5th', 'year': '2021', 'pdf_link': 'https://drive.google.com/file/d/1Ig0l2GEGEl3SgO_sojuL826wuR4gi6mk/view'},
            {'paper_id': '51343', 'paper_name': 'Accounting For MGT.', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1M6fx0Ua9bOw03pCqni1qKC0fysL9jtgR/view'},
            {'paper_id': '51342', 'paper_name': 'Cost Accounting-I', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1WfK8ejq6eOOlkaM8f0EFecvRDbZYzoJQ/view'},
            {'paper_id': '51345', 'paper_name': 'Entrepreneurship and Small Business', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1gQttsNirdMxtKhtB23qk_11xBsbHxbAO/view'},
            {'paper_id': '51346', 'paper_name': 'International Trade', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1CCC9GYmTCa9WqYrjwPBJoLCLEEfElJeN/view'},
            {'paper_id': '53004', 'paper_name': 'Business Environment', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1CrayG2KTBPzQuBQLmQrUUoEcoM_gSOnh/view'},
            {'paper_id': '53003', 'paper_name': 'Business Law', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/15xdK8PHZvZog2CgR6UcTtTg8APHxeN4P/view'},
            {'paper_id': '53002', 'paper_name': 'Financial Management', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1tBcs2XwZl7UkiQQgwL6cp2tMbm6ZaIci/view'},
            {'paper_id': '53005', 'paper_name': 'Financial Market Operations', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Rz6UuwROpVMklHxCOXX8FcWz13X2gqiw/view'},
            {'paper_id': '53001', 'paper_name': 'Income Tax', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1MKLTEgLOC3p4bt_Ba-xy3-7gz4RIhZyi/view'},
            {'paper_id': '53007', 'paper_name': 'Retail Management', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1__6SKbQbl_PaS3f1fgakcNEjVCz5gx5d/view'},
            {'paper_id': '51343', 'paper_name': 'Accounting for Management', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1_bGrUhDVO4rkbkuydPOr8RT8BfVo6aY6/view'},
            {'paper_id': '51342', 'paper_name': 'Cost Accounting-I', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1MVkJY0Q3GMFL2IcA33TwQwq9MFG0RkFj/view'},
            {'paper_id': '51341', 'paper_name': 'Entrepreneurship and Small Scale Business Management', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1CfdV_eY34dQLRIXOdEH71uS7-4cuf5RK/view'},
            {'paper_id': '51344', 'paper_name': 'Financial Market Operations', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1cct4KX7J_mFnMx-sPFMYbc03yLknVDge/view'},
            {'paper_id': '51349', 'paper_name': 'International Business Environment', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1jGSyDB8b9TsBAJZyU7QY_9_7GxSon05Y/view'},
            {'paper_id': '51341', 'paper_name': 'Taxation Law', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1sBHxI0zAqmLjaos2saT4RzmmtNoPHmlo/view'},
            # 6th Sem
            {'paper_id': '4553', 'paper_name': 'Entrepreneurship Development', 'semester': '6th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1WKwhICBqpr9MfgC23_5c9szvZ4_SYaHU/view'},
            {'paper_id': '61345', 'paper_name': 'Goods and Service Taxes', 'semester': '6th', 'year': '2017', 'pdf_link': 'https://drive.google.com/file/d/1H1S_yF_KcPq4ncx9DAgPQJr0XSiXzv-D/view'},
            {'paper_id': '61344', 'paper_name': 'Auditing', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1_3Qoex-S0E4sDmkw8OOS6nna57eqGDlx/view'},
            {'paper_id': '61342', 'paper_name': 'Cost Accounting-II', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1GR8jBLh4pHXvmgkdaKtpR4sRuObJSGMn/view'},
            {'paper_id': '61343', 'paper_name': 'Financial Management', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Upiu6ZkKKy1k2YYf-SiRTLfTe3-vafIU/view'},
            {'paper_id': '61345', 'paper_name': 'Goods and Service Tax and Customs Law', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1lvvoPqOhPOMsMoib8a8IG_jG_GQUlKki/view'},
            {'paper_id': '61346', 'paper_name': 'International Marketing', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Mkp_05wyuqthlGNu2rQfkm43SQav2Cqg/view'},
            {'paper_id': '61341', 'paper_name': 'Taxation Law-II', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1haodT70crkB4cRjodY4betuHDjOlKR14/view'},
            {'paper_id': '61344', 'paper_name': 'Auditing', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1JuQX1-kT4ghwgIq_iYGgSGjciWepXBKu/view'},
        ]

        for paper in papers_data:
            IGUBcomPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'B.Com',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all B.Com papers!'))