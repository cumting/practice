import re

x = '1我爱你1ss多点ss'
r1 = '[a-zA-Z0-9’!"#$%&\'()*+,-./:;<=>?@，。?★、…【】《》？“”‘’！[\\]^_`{|}~]+'
 
print(re.sub(r1, '', x))
 
