# ===========================================================================
# eXe 
# Copyright 2004-2005, University of Auckland
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
# ===========================================================================

import sys
import logging
import gettext
from exe.engine.idevice import Idevice
from exe.webui.block    import Block

log = logging.getLogger(__name__)
_   = gettext.gettext

# ===========================================================================
class BlockFactory(object):
    """
    BlockFactory is responsible for creating the right block object to match
    a given Idevice.  Blocks register themselves with the factory, specifying
    which Idevices they can render
    """
    def __init__(self):
        self.blockTypes = []

    def registerBlockType(self, blockType, ideviceType):
        """
        Block classes call this function when they are imported
        """
        log.debug("registerBlockType", 
                  blockType.__name__, 
                  ideviceType.__name__)
        self.blockTypes.append((blockType, ideviceType))

    def createBlock(self, idevice):
        """
        Returns a Block object which can render this Idevice
        """
        for blockType, ideviceType in self.blockTypes:
            if isinstance(idevice, ideviceType):
                return blockType(idevice)
        
        log.error("No blocktype registered for", type(idevice).__name__)
        return None
        

# TODO move this global into a WebUI class???
g_blockFactory = BlockFactory()

# ===========================================================================
