from django.core.management.base import BaseCommand
from accounts.models import IGUPaper

class Command(BaseCommand):
    help = 'Import IGU B.Tech papers from HTML to database'

    def handle(self, *args, **options):
        papers_data = [
            # ========== 1st YEAR ==========
            # 1st Sem
            {'paper_id': '12477', 'paper_name': 'Basic Electrical Engineering', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1nggK3htInbjiL0IH8l86I1C2leKjp7AG/view'},
            {'paper_id': '12472', 'paper_name': 'Semiconductor Physics', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1MLSSZ1rsXR7XTCDWJGWlCd1axosd-PCQ/view'},
            {'paper_id': '12731', 'paper_name': 'Humanities English Language Skill', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1zoT5Zulsxoz_ewXCz8y4xYInuF_ymuU1/view'},
            {'paper_id': '12731', 'paper_name': 'Humanities English and Literature', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1zn9qhDZsGGTucbfu2VxfCdMp9KwFSHLc/view'},
            {'paper_id': '12476', 'paper_name': 'Calculus and Linear Algebra', 'semester': '1st', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1OaA8SO3oPSUc4tbw4mve-8UVsx0ozwWm/view'},
            {'paper_id': '12476', 'paper_name': 'Calculus and Linear Algebra', 'semester': '1st', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1wZvOzDdxVddptPW42a1sOuoUjol0ZEF_/view'},
            
            # 2nd Sem
            {'paper_id': '12474', 'paper_name': 'Chemistry - I', 'semester': '2nd', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/11MtNfJnjAGZ_bAwimR5C2-ze4WtQmxmG/view'},
            {'paper_id': '22480', 'paper_name': 'Workshop', 'semester': '2nd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1Tu5fRQhmFLENmxY6aK3V_MbXJT53xJHZ/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '2nd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1cWAIh_e3WA11QR6MJvK6ClMmx_pPaXs1/view'},
            {'paper_id': '22480', 'paper_name': 'Workshop', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1W0gjE7eXDHIjrhxhqxYZt2fT8DHRJo0H/view'},
            {'paper_id': '22476', 'paper_name': 'Mathematics - II', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1hsChMXQv4Q2urLpoKW29M8DdHjzKWLjm/view'},
            {'paper_id': '22703', 'paper_name': 'Communication Skills', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1G4OMSAQmfkiyZRDe8l_zRBRYWZw3RoLP/view'},
            {'paper_id': '22999', 'paper_name': 'Computer Awareness', 'semester': '2nd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1yN9oIVPY2EOiQnPN6QlfCZIM87RA3ott/view'},
            {'paper_id': '22474', 'paper_name': 'Chemistry', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Y3O_FcbOb0H1zyOUR4zc-e4xj1rMAjWY/view'},
            {'paper_id': '22470', 'paper_name': 'Introduction to Electromagnetic', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1_9AZdM_jurZmCMqa6FH1O3sVMqefOn7f/view'},
            {'paper_id': '22475', 'paper_name': 'Multivariable Calculus', 'semester': '2nd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1vwMW1cziktRSB_x41_JqlvsgSJxaMOoE/view'},
            {'paper_id': '22474', 'paper_name': 'Chemistry', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1cXJdMIx-dSRtavOwdHG0SqfZJ0edzwVN/view'},
            {'paper_id': '22476', 'paper_name': 'Math Probabilities & Stats', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1QUefYwGsf-S7HxptgbyeEczZ3U8OVGwA/view'},
            {'paper_id': '22478', 'paper_name': 'Programming For Problem Solving', 'semester': '2nd', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1V7WxNkNCpsThBAPbTaY7KBsLnZNbWKwk/view'},
            
            # ========== 2nd YEAR ==========
            # 3rd Sem
            {'paper_id': '32768', 'paper_name': 'Electric Circuit Analysis', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/150eoDLBZoPMKDfvLf3B2YTfOoXVpwkBz/view'},
            {'paper_id': '32466', 'paper_name': 'Fundamental of Management', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1X529nf3fLTRcoQgq6plPdXv7fin-fYEs/view'},
            {'paper_id': '32769', 'paper_name': 'Analog Electronics', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1Xz1fYAEMowppMAzEYans7AIGWN9dJJZI/view'},
            {'paper_id': '32464', 'paper_name': 'Digital & Analog Comm', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1miUWmyoce0WlBr9rcHY-ksoyUnF130Mc/view'},
            {'paper_id': '32473', 'paper_name': 'Economics for Engineers', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1424pCNmMh1JSbova6vjVVIlvqLIWLVpq/view'},
            {'paper_id': '32922', 'paper_name': 'Thermodynamics', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/17tWoq5XwFPvaaNeWkRIlTV5lWlaaJKLv/view'},
            {'paper_id': '32469', 'paper_name': 'Data Structures & Algorithms', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1iMwpwLyqxHSBVLxFylwNPFAAx7PAQbWi/view'},
            {'paper_id': '32747', 'paper_name': 'Electronic Devices', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1MhGkIZ1scKB4xlF_MaVH7qZFpxobdwrb/view'},
            {'paper_id': '32468', 'paper_name': 'DBMS', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1FwtBkSFH2HHKVlftWQuK9as_x7k_ZkLN/view'},
            {'paper_id': '32743', 'paper_name': 'Engineering Mechanics', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1RrRF82JOT__HYzViXQy80ldrXuqtNKSv/view'},
            {'paper_id': '32748', 'paper_name': 'Digital System Design', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1VCLQh1ACYeR056XBLCIi3nHDmRxlghXj/view'},
            {'paper_id': '32921', 'paper_name': 'Basic of Mechanical Engg', 'semester': '3rd', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1IQ0JK6Eqs2MzTXxP-s3mgY9t9y8BSj2W/view'},
            
            # 3rd Sem (2023)
            {'paper_id': '32770', 'paper_name': 'Electrical Machine', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1PivHO8dfxqQfFyoOXRb9Mn6pT_JCuD9Q/view'},
            {'paper_id': '32468', 'paper_name': 'Database Management System', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1_mtbhZ97KF9QLvCBdvAlVs9rnDP3z43n/view'},
            {'paper_id': '32473', 'paper_name': 'Economics of Engineering', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1xCWnw-I-cn-n_Yw5j-WE37SecWINSsWL/view'},
            {'paper_id': '24043', 'paper_name': 'Digital Electronics', 'semester': '3rd', 'year': '2013', 'pdf_link': 'https://drive.google.com/file/d/15RGgi1apomKhbgOMtOHVJzvuSgKHLuO1/view'},
            {'paper_id': '32469', 'paper_name': 'Data Structure & Algorithms', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1d-Eu94C6jmoelnQulKQDl8Ku3TPeymym/view'},
            {'paper_id': '32794', 'paper_name': 'Fluid Mechanics', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Oemc9j2JErdR0vTluz3EVSuNm0EZTjqu/view'},
            {'paper_id': '32795', 'paper_name': 'Surveying', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/18iB8bJU_r4gP6zLmJkGwQhrVZICKPP_D/view'},
            {'paper_id': '32921', 'paper_name': 'Basic of Mechanical Engg', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Hp9ss-XcW-MQIRB331V_4eSuqW_UoCFT/view'},
            {'paper_id': '32472', 'paper_name': 'Math - III', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/10CEpWTOzXIoLkXWzjphEdYJQlKVn5SYK/view'},
            {'paper_id': '32793', 'paper_name': 'Environmental Science', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1XKtfPV_YcsY_rfMimyvayhfuoIlcop0J/view'},
            {'paper_id': '32768', 'paper_name': 'Electrical Circuit Analysis', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1J-A0_NvTUbxo9H_ucMkkoIbLZ3g-U_G8/view'},
            {'paper_id': '32770', 'paper_name': 'Electronical Machine', 'semester': '3rd', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1h5jA_kXs89JBehNKcGMR8K0sRmZ4dsTq/view'},
            
            # 3rd Sem (2024)
            {'paper_id': '32468', 'paper_name': 'DBMS', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1zXidEN3t601ZRq0bkqe3llbMzOX1fCii/view'},
            {'paper_id': '32740', 'paper_name': 'Mathematics-III', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/13gqnr2HCFM_0VsVo5NNdqCBtXriQfdZx/view'},
            {'paper_id': '32769', 'paper_name': 'Analog Electronics', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1F6NB9-gd7y8J01Ee66Fx0R_GwVag1DDh/view'},
            {'paper_id': '32472', 'paper_name': 'Mathematics-III', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Lb8mXDu4NAsi2RXeJZ72xxMSusq3gbMI/view'},
            {'paper_id': '32469', 'paper_name': 'Data Structure & Algorithm', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1i4GaKxaW_9WjuXHLHskj9cC8IufB8XUr/view'},
            {'paper_id': '32473', 'paper_name': 'Economics for Engineers', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1FTq_aNt2SZvxCQa3el-7rrPXFlWu6lgy/view'},
            {'paper_id': '32470', 'paper_name': 'Digital Electronics', 'semester': '3rd', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1ghs7wABAiOp8vpnC_-7fljFh-8hrstB9/view'},
            
            # 4th Sem
            {'paper_id': '42749', 'paper_name': 'Microcontroller', 'semester': '4th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1pNlCG73Nv4kjPl3hBhkWgTsukqFFLp68/view'},
            {'paper_id': '42468', 'paper_name': 'Discrete Mathematics', 'semester': '4th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1D3wiI9U1rTKCBFaiRfUHrc8x75PGTF0t/view'},
            {'paper_id': '42769', 'paper_name': 'Electrical Machine-II', 'semester': '4th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1o1gPFGOiq01vdmicfYPg6WjYMqFyzh9w/view'},
            {'paper_id': '42734', 'paper_name': 'Kinetics of Machines', 'semester': '4th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1pj-knorkEHHx4ehKSpSY8NTzcpAfGOO3/view'},
            
            # 4th Sem (2023)
            {'paper_id': '42468', 'paper_name': 'Discrete Mathematics', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/16GmxStnUCutAPrVftBmtVcagPd0W3H0y/view'},
            {'paper_id': '42472', 'paper_name': 'Organizational Behavior', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1ff0b1CD4TKSLVzQqrTRoy1yZopDlomub/view'},
            {'paper_id': '42469', 'paper_name': 'Computer Organization', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Ke5OMIFdKyrXvBbvCbyuYHj-2L8mBWcM/view'},
            {'paper_id': '42471', 'paper_name': 'Object Oriented Programming', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1uTPFg1pwwyLGsEnGFZDtWPrCAHw3QDmZ/view'},
            {'paper_id': '42474', 'paper_name': 'Web Technology', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1RJNxmvMWUn3SOlW5M7-nwHorrBcOLiXd/view'},
            {'paper_id': '43741', 'paper_name': 'Material Engineering', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1rkCEm_1l2HwY0LrouqtNn3DXupQKtqVU/view'},
            {'paper_id': '42473', 'paper_name': 'Environmental Science', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1nDPQgYW8CICf_gp6NKIOsl4H-igHLuHa/view'},
            {'paper_id': '42772', 'paper_name': 'Math-III (Prob & Stats)', 'semester': '4th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1_iMcuLcAX5hEijMZv8xBMCr1sq382Goo/view'},
            
            # 4th Sem (2024)
            {'paper_id': '42468', 'paper_name': 'Discrete Mathematics', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1f_-cTxmWqTPAoE-fS8kuG5UH-cHjX1io/view'},
            {'paper_id': '42472', 'paper_name': 'Organizational Behavior', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1gOrE4BHLF10dwj-pOcQ_3q26RCyfZmBK/view'},
            {'paper_id': '42474', 'paper_name': 'Web Technology', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1dfF6cap7kGmhl-ywAEn7mmNO-IK-F_NC/view'},
            {'paper_id': '42473', 'paper_name': 'Environmental Science', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1WaWVTwE1Ix9I1r6unmN2Es7kBEx1rKgH/view'},
            {'paper_id': '42471', 'paper_name': 'Object Oriented Programming', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1qwVCBxpg1lpUEQA4BKjGQ1LKTHTtKKfO/view'},
            {'paper_id': '42773', 'paper_name': 'Biology', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Ae6M0gxpdIdkEFjGAG3d3_2gn624C6dk/view'},
            {'paper_id': '42469', 'paper_name': 'Computer Organization', 'semester': '4th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1HdpT09QtrfsAvK2hN5pdNyEGLVF6-79k/view'},
            
            # 4th Sem (2025)
            {'paper_id': '42470', 'paper_name': 'Operating System', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1ogQjXvsfeBg5IGlrv6hseR7aL1hajzH4/view'},
            {'paper_id': '42471', 'paper_name': 'OOP', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1JvBRhNcr17EJVPHrm7attBljjVxX9dBR/view'},
            {'paper_id': '41472', 'paper_name': 'Organizational Behavior', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1nByPFjjPzPQs_2C5gTnpRMgi7K8dy2aZ/view'},
            {'paper_id': '42473', 'paper_name': 'Environmental Science', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1obd2XXxTXat4Ux7yIdzERXsWsrVxsFyc/view'},
            {'paper_id': '42474', 'paper_name': 'Web Technology', 'semester': '4th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1zQS9_ItPr13iE6usJZZDg_biKRyK6vMB/view'},
            
            # ========== 3rd YEAR ==========
            # 5th Sem
            {'paper_id': '24166/24268', 'paper_name': 'Multi Media Technology', 'semester': '5th', 'year': '2013', 'pdf_link': 'https://drive.google.com/file/d/1eWND9AkartbDtsoPjiiNY-abRnDZ0M9i/view'},
            {'paper_id': '56009', 'paper_name': 'Electrical Material', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1Q46YO3jD138U_TDPWVGXAIWIGNzLLPrL/view'},
            {'paper_id': '54054', 'paper_name': 'Digital Signal Processing', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1-RW3Di2IvCC4I1Tv3yco3ggohI5rAnwN/view'},
            {'paper_id': '54053', 'paper_name': 'Communication Theory', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1e5wJzePJ9mPI5ehhLA9ykDHIaR5U73_m/view'},
            {'paper_id': '54003', 'paper_name': 'Formal Language & Automata', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1C0fpmZG7FHZE2oNGUZ43c1FzcHASKJok/view'},
            {'paper_id': '54055', 'paper_name': 'Power Electronics', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1nKp-D-H2VHTAqyAjBubeHXRePvPrXxGv/view'},
            {'paper_id': '54002', 'paper_name': 'Computer Network', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1wevQESCqLrggUltfiBeNv2rcGJiwit9c/view'},
            {'paper_id': '55055', 'paper_name': 'Fluid Mechanics', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/17BBDjghNSeZ7BBG7ZlEmWMlWVaRdrulw/view'},
            {'paper_id': '54055', 'paper_name': 'Measurement & Presentation', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/14jatZB2JiseiBKpHwRqwVBPTMqAmpRrN/view'},
            {'paper_id': '56012', 'paper_name': 'Power Plant Engineering', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1SBbRvSsaPqJ-6o2Rh-o-aRsaHgbmQbBW/view'},
            {'paper_id': '54001', 'paper_name': 'Microprocessor', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1iAUZeKQAZuQUJbdx4LyKkJfPB24PvdAS/view'},
            {'paper_id': '54065', 'paper_name': 'Measurement & Instrumentation', 'semester': '5th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1Ar03Axfm1KE7I07O3exDxNr5hSBncwva/view'},
            
            # 5th Sem (2023)
            {'paper_id': '55053', 'paper_name': 'Manufacturing Technology', 'semester': '5th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Fecp3uQL_q6JGqlAiqaUEpDty8CEEHyJ/view'},
            
            # 5th Sem (2024)
            {'paper_id': '55001', 'paper_name': 'Hydrology & Water Resource', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1GdR392Dtk8sQ3vMrOBSwRTDZHf9Nz4am/view'},
            {'paper_id': '55005', 'paper_name': 'Design of Steel Structures', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1vLJ3AaI1Qt4xKRS9hQkcuQv4huPrB1FY/view'},
            {'paper_id': '55053', 'paper_name': 'Manufacturing Technology', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1afn7hucXh_8XcoKtOH3fVU8Hou0sM93Y/view'},
            {'paper_id': '56003', 'paper_name': 'Microprocessor & Controller', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1h6QHjy4k1x2TmckJO3CDZ8tqBwa5xsq0/view'},
            {'paper_id': '54007', 'paper_name': 'System Programming', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1v7F5Kl6FImEzBPyvvMJz0JGOQ_X_TEqs/view'},
            {'paper_id': '54004', 'paper_name': 'Design & Analysis of Algorithms', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1Bu8GqsZUjXf1PIdeNZraLMGULzvu43Sl/view'},
            {'paper_id': '54002', 'paper_name': 'Computer Network', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1_hd1T1e4swa9mBOeW_B7cp7ZcG8peDru/view'},
            {'paper_id': '54006', 'paper_name': 'Software Engineering', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/11195ZCop4vye5Q9wURZHhHyNT7Y0Z3lQ/view'},
            {'paper_id': '54003', 'paper_name': 'Formal Language & Automata', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1kA8x0QD1JGNuyGi3-_E_ob7MuoP_pj8Y/view'},
            {'paper_id': '54001', 'paper_name': 'Microprocessor', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1rM14S9g93kZFR3y9g-53VmXJZYd-ECY9/view'},
            {'paper_id': '54005', 'paper_name': 'Programming in Java', 'semester': '5th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1uz4JYcdvhN8Qw7xFxcln93i-VfslfwiQ/view'},
            
            # 6th Sem
            {'paper_id': '64004', 'paper_name': 'Data Science', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1nVyx74FnR1pJhRNKGGVN0ySKoYeciCVm/view'},
            {'paper_id': '64054', 'paper_name': 'CMOS Design', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/12cIwdmcwJ4l-eawbQW4bWUsb94upXHx0/view'},
            {'paper_id': '64051', 'paper_name': 'Control System', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1y6bdv-RUR2Aklt3U220yEXtsRpSAwtf-/view'},
            {'paper_id': '64002', 'paper_name': 'Artificial Intelligence', 'semester': '6th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1Apl-dOU8jQRwAksDBoL3rLTlmZZpFvAg/view'},
            {'paper_id': '65059', 'paper_name': 'Organizational Behavior', 'semester': '6th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1CtjinHOSZb12QltAlZYUJqpMuNRDYVX8/view'},
            {'paper_id': '64004', 'paper_name': 'Data Science', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1dRcINgb3jJDUZc9RXQMHDdP6oAfFP_Ub/view'},
            {'paper_id': '64002', 'paper_name': 'Artificial Intelligence', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1f_e99k03PVFOnvmGcgw_o2v96pm-Q2Yy/view'},
            {'paper_id': '64003', 'paper_name': 'Advance Java', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1O1DrAl1wuOoxG4EySeBvwyldiYdlM0KG/view'},
            {'paper_id': '64011', 'paper_name': 'Mobile & Wireless Comm', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/1n2tU7A61bikAO6R4eAi71ytkzTKj4TiG/view'},
            {'paper_id': '64006', 'paper_name': 'Mobile Application Dev', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/152eM6mgZXQSfkvxItJLmKs2qM0eXEUfO/view'},
            {'paper_id': '64001', 'paper_name': 'Compiler Design', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/153EnYpjmLZ1FPf3mHS3r3Lihx_UZOS7V/view'},
            {'paper_id': '66004', 'paper_name': 'Power System Protection', 'semester': '6th', 'year': '2025', 'pdf_link': 'https://drive.google.com/file/d/191Q18a6wiN4nrztEFNAuA98HK3bq3LHX/view'},
            
            # ========== 4th YEAR ==========
            # 7th Sem
            {'paper_id': '72461', 'paper_name': 'Advanced Computer Architecture', 'semester': '7th', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1MreEAGoaXmagUEKuwjEkGkRfYCOO_IUV/view'},
            {'paper_id': '72466', 'paper_name': 'Advanced DBMS', 'semester': '7th', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1yBSl3_-ROLW4lHhZEcCvR2W-0lzcLfQ4/view'},
            {'paper_id': '72465', 'paper_name': 'Advanced Java', 'semester': '7th', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1jWAxuFS-c3j0w9pbl88MPrRfd4XDs1m5/view'},
            {'paper_id': '72463', 'paper_name': 'Compiler Design', 'semester': '7th', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1jaA6ao7dypZ_fxEmpC864a3PR1yCZR_H/view'},
            {'paper_id': '72464', 'paper_name': 'Neural Networks', 'semester': '7th', 'year': '2019', 'pdf_link': 'https://drive.google.com/file/d/1mDAK_CqiZcWzvrLoQGtRNUR8ennPsGUL/view'},
            {'paper_id': '74007', 'paper_name': 'Network Security & Cryptography', 'semester': '7th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1wpsZ-0BO5UoKzRoNoadFD-HTvN7v2n06/view'},
            {'paper_id': '72783', 'paper_name': 'Estimating and Costing', 'semester': '7th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1rmYFlQDdCrRxMSGteov1hBY5ytXm0Gxz/view'},
            {'paper_id': '72770', 'paper_name': 'Extra High Voltage AC/DC', 'semester': '7th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1wQwk4YyEuFQLDlz1S9DbULVDcraVZPoB/view'},
            {'paper_id': '72753', 'paper_name': 'Digital Signal Processing', 'semester': '7th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1LspDYHY9jK2JoW9NfE-gsadIfaMpOV7r/view'},
            {'paper_id': '72766', 'paper_name': 'Renewable Energy Resources', 'semester': '7th', 'year': '2022', 'pdf_link': 'https://drive.google.com/file/d/1BCNs75pEBwOLrBb8WeknsQqjYhG-MZfW/view'},
            {'paper_id': '74058', 'paper_name': 'Microwave Theory', 'semester': '7th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1kiEA6HtMw4EHcNVnYTKJ8YkxyZU4UixB/view'},
            {'paper_id': '74003', 'paper_name': 'Software Project Management', 'semester': '7th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1YCWLOYBm7p9QLy1jPDYgOXenewFIlDvk/view'},
            {'paper_id': '76025', 'paper_name': 'Fundamentals of Management', 'semester': '7th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1jtkwrEio78-ubNSPqF9SoXHZXooYK0mM/view'},
            {'paper_id': '76015', 'paper_name': 'Intelligence System & Control', 'semester': '7th', 'year': '2023', 'pdf_link': 'https://drive.google.com/file/d/1cRapOj7Y8cauyl8P61Q-fdWXk8szE3wI/view'},
            {'paper_id': '76009', 'paper_name': 'Computer Aided Power System', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1L43MikOZ39Fbq5S92xInFfUSqmZw-ivH/view'},
            {'paper_id': '74001', 'paper_name': 'Neural Network', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1tpZLO91fzE4vblZVJaFJQGh_UPB-kk8b/view'},
            {'paper_id': '74003', 'paper_name': 'Software Project Management', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1arxkqpFX4P44uuETznDqXlC2SDRvo835/view'},
            {'paper_id': '75056', 'paper_name': 'Automobile Engineering', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1lkBTz0v3hB-1Y8BmpGhfGXjjGU48DyfA/view'},
            {'paper_id': '75055', 'paper_name': 'Design of Machine Elements', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1IBp7DuPdRvreXwaB5VP3rE8Nw-sp8_Y3/view'},
            {'paper_id': '76001', 'paper_name': 'Power Management', 'semester': '7th', 'year': '2024', 'pdf_link': 'https://drive.google.com/file/d/1KVxAQ7zrqN_4JBDujmOp419PDW0uwnXE/view'},
        ]

        for paper in papers_data:
            IGUPaper.objects.get_or_create(
                paper_id=paper['paper_id'],
                paper_name=paper['paper_name'],
                semester=paper['semester'],
                year=paper['year'],
                pdf_link=paper['pdf_link'],
                defaults={
                    'course': 'B.Tech',
                }
            )
            self.stdout.write(f"Added: {paper['paper_name']} ({paper['semester']} Sem, {paper['year']})")

        self.stdout.write(self.style.SUCCESS('Successfully imported all papers!'))