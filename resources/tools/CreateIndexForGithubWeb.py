'''

 Description: 
   This tool is automatically used to create index_for_web.json for github website. 
   The python version is 3.5.0
 
 How to run: 
   1) Before running the script, please set your local path for variable "index_for_web_path" in the script.

 Forked from IBM Predictive Analytics repository (2015)
 
'''
import urllib.request
import json
import re

def createIndexForWeb(index_for_web_path):
    #read name and desc info from api.github.com
    api_url = "https://api.github.com/orgs/IBMDecisionOptimization/repos?per_page=1000"
    raw_info_json_url = 'https://raw.githubusercontent.com/IBMPredictiveAnalytics/repos_name/master/info.json'

    #key_list for repository info.json
    key_list = ['type', 'provider', 'software', 'language', 'category', 'promotion']
    indent_space = '    '

    api_json_data = json.loads(urllib.request.urlopen(api_url).read().decode('utf-8'))
    index_for_web_json = "{\n\"repository_index\":[\n"
    index_for_web = open(index_for_web_path,'w')

    for item in api_json_data:
        repo_name = item['name']
        #ignore .io repository
        if('IBMDecisionOptimization.github.io' == repo_name):
            continue
        
        repo_desc = item['description']
        repo_info_json_url = re.sub('repos_name', repo_name, raw_info_json_url)
        try:
            repo_info_json = json.loads(urllib.request.urlopen(repo_info_json_url).read().decode('utf-8'))
        except:
            continue
        
        json_item = indent_space+'{\n'
        json_item += indent_space + indent_space + "\"repository\":" +"\"" + repo_name +"\",\n" 
        json_item += indent_space + indent_space + "\"description\":" +"\"" + repo_desc +"\",\n"  
        
        for key in key_list:
            if type(repo_info_json[key]) == list:
                val = repo_info_json[key][0]
            else:
                val = repo_info_json[key]
            json_item += indent_space + indent_space + "\"" + key + "\":" + "\"" + val + "\",\n"
        json_item = json_item[0:-2]+'\n'
        json_item += indent_space + "},\n"  
        index_for_web_json += json_item
    index_for_web_json = index_for_web_json[0:-2]
    index_for_web_json += '\n]\n}'
    index_for_web.write(index_for_web_json)  
    index_for_web.close()

if __name__ == '__main__':
    #Please use your own path of 'index_for_web.json'
    index_for_web_path = r'../../index_for_web.json'
    createIndexForWeb(index_for_web_path)