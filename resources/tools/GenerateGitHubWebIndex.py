'''

 Description:
   This tool is automatically used to create cards.json for github website.

 Requirements:
    The python version is 3.5.0+

 Usage: GenerateGitHubWebIndex.py [-h] [-i INPUT] [-o OUTPUT] [-u username] [-p password]

 Forked from IBM Predictive Analytics repository (2015)

'''
import argparse
import urllib.request
import json
import re
# remove depracated warning in python2.6
try:
    from hashlib import sha1 as _sha, md5 as _md5
except ImportError:
    import sha
    import md5
    _sha = sha.new
    _md5 = md5.new

def createIndexForWeb(_input, _output):
    #read name and desc info from api.github.com
    # Github.com
    # api_url = "https://api.github.com/orgs/IBMDecisionOptimization/repos?per_page=1000"
    # GitHub.ibm.com
    # api_url = 'https://api.github.ibm.com/orgs/IBMDecisionOptimization/repos?per_page=1000'
    api_url = input
    cards=[]
    # GitHub.com
    raw_info_json_url = 'https://raw.githubusercontent.com/IBMDecisionOptimization/repos_name/master/info.json'
    # GitHib.ibm.com
    # raw_info_json_url = 'https://raw.github.ibm.com/IBMDecisionOptimization/repos_name/master/info.json'
    api_json_data = json.loads(urllib.request.urlopen(_input).read().decode('utf-8'))
    index_for_web = open(_output,'w')

    for item in api_json_data:
        repo_name = item['name']
        #ignore .io repository
        if('ibmdecisionoptimization.github.io' == repo_name):
            continue
        repo_info_json_url = re.sub('repos_name', repo_name, raw_info_json_url)
        try:
            repo_info_json = json.loads(urllib.request.urlopen(repo_info_json_url).read().decode('utf-8'))
        except:
            continue
        card = {}
        card['url'] = item['html_url']
        card['author'] = repo_info_json['provider'][0]
        card['name'] = repo_info_json['name']
        card['description'] = repo_info_json['abstract']
        # industries
        card['industries'] = repo_info_json['industry']
        # models
        card['models'] = repo_info_json['model']
        # developments
        card['developments'] = repo_info_json['development']
        # categories - at this time, only one main category is allowed
        try:
            categories = repo_info_json['category']
            card['categories'] = list(categories[0].keys())
        except Exception:
            pass
        # class
        card['class'] = ''
        if card['categories'][0] == 'APPLICATION':
            card['class'] = 'cat-green'
        elif card['categories'][0] == 'CLIENT':
            card['class'] = 'cat-blue'
        elif card['categories'][0] == 'MODELING':
            card['class'] = 'cat-purple'

        cards.append(card)

    json_data = json.dumps(cards)
    index_for_web.write(json_data)
    index_for_web.close()

def init():
    __author__ = 'ibm decision optimization team'

    parser = argparse.ArgumentParser(description='This tool is automatically used to create cards.json for github website.')
    parser.add_argument('-i','--input', help='GitHub Organization repository url',required=False)
    parser.add_argument('-o','--output',help='Output file name', required=False)
    parser.add_argument('-u','--username',help='GitHub username', required=False)
    parser.add_argument('-p','--password',help='GitHub password', required=False)
    args = parser.parse_args()

    ## show values ##
    if not (args.input is None):
        repo_url = args.input
    else:
        repo_url = "https://api.github.com/orgs/IBMDecisionOptimization/repos?per_page=1000"
    if not (args.output is None):
        web_json = args.output
    else:
        web_json = "../data/info.json"
    if not (args.username is None): print ("GitHub username: %s" % args.username )
    if not (args.password is None): print ("GitHub password: %s" % args.password )
    createIndexForWeb(repo_url, web_json)

if __name__ == '__main__':
    init()